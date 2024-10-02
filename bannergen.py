import os
import json
import argparse
from selenium import webdriver
from selenium.webdriver import Chrome

from LayoutDETR.gen_single_sample_API import load_model as load_model_layoutdetr
from utils.util import safeMakeDirs
from InstructPix2Pix.gen_single_sample_API import load_model as load_model_instructpix2pix
from RetrieveAdapter.gen_single_sample_API import load_model as load_model_retrieveadapter
from LayoutDETR.gen_single_sample_API import generate_banners as generate_banners_layoutdetr
from InstructPix2Pix.gen_single_sample_API import generate_banners as generate_banners_instructpix2pix
from RetrieveAdapter.gen_single_sample_API import generate_banners as generate_banners_retrieveadapter

BANNER_GEN_MODEL_MAPPER = {
    'LayoutDETR': {'layout': 'ads_multi.pkl'},
    'InstructPix2Pix': {'layout': 'instructpix2pix.ckpt'},
    'RetrieveAdapter': {'superes': 'rdn-liif.pth', 'saliency': 'u2net.pth'}
}

BROWSER_CONFIG = [
    'no-sandbox',
    'disable-infobars',
    'disable-dev-shm-usage',
    'disable-browser-side-navigation',
    'disable-gpu',
    'disable-features=VizDisplayCompositor',
    'headless'
]


class BannerGenerator:
    def __init__(self, model_name, model_path, image_path, banner_content_path, header_text='', body_text='', button_text='',
                 post_process=None, num_result=3, output_path='result'):
        self.model_name = model_name
        self.model_path = model_path
        self.image_path = image_path
        self.banner_content_path = banner_content_path
        self.header_text = header_text
        self.body_text = body_text
        self.button_text = button_text
        self.post_process = post_process or {'jitter': 5 / 6, 'horizontal_center_aligned': 2 / 3, 'horizontal_left_aligned': 1 / 3}
        self.num_result = num_result
        self.output_path = output_path
        self.browser = None
        self.model = None
        self.banner_content = None

    def validate_inputs(self):
        if self.model_name not in BANNER_GEN_MODEL_MAPPER.keys():
            raise ValueError('Invalid model name.')

        if not os.path.exists(self.output_path):
            safeMakeDirs(self.output_path)
            os.symlink(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'BannerGen/RetrieveAdapter/templates/css'),
                       os.path.join(self.output_path, 'css'))

        if not os.path.exists(self.image_path):
            raise FileNotFoundError('Please provide a valid image path.')

        if not os.path.isdir(self.model_path):
            raise NotADirectoryError('Please provide a valid model path.')

        if not os.path.exists(self.banner_content_path) or os.path.splitext(self.banner_content_path)[1] != '.json':
            raise FileNotFoundError('Please provide a valid banner content json file.')

    def load_banner_content(self):
        with open(self.banner_content_path, 'r') as fp:
            self.banner_content = json.load(fp)

    def update_banner_content(self):
        if self.header_text or self.body_text or self.button_text:
            for ele in self.banner_content['contentStyle']['elements']:
                ele['text'] = ''
                if ele['type'] == 'header' and self.header_text:
                    ele['text'] = self.header_text
                elif ele['type'] == 'body' and self.body_text:
                    ele['text'] = self.body_text
                elif ele['type'] == 'button' and self.button_text:
                    ele['text'] = self.button_text

    def setup_browser(self):
        options = webdriver.ChromeOptions()
        for opt in BROWSER_CONFIG:
            options.add_argument(opt)

        self.browser = Chrome(executable_path='/usr/local/bin/chromedriver', options=options)
        self.browser.set_window_size(2000, 2000)  # Set window size

    def load_model(self):
        if self.model_name == 'LayoutDETR':
            self.model = load_model_layoutdetr(os.path.join(self.model_path, BANNER_GEN_MODEL_MAPPER[self.model_name]['layout']))
        elif self.model_name == 'InstructPix2Pix':
            model_instructpix2pix, model_wrap_cfg, model_wrap, null_token = load_model_instructpix2pix(
                os.path.join(self.model_path, BANNER_GEN_MODEL_MAPPER[self.model_name]['layout']))
            self.model = (model_instructpix2pix, model_wrap_cfg, model_wrap, null_token)
        elif self.model_name == 'RetrieveAdapter':
            model_superes, model_saliency, model_text, model_face = load_model_retrieveadapter(
                os.path.join(self.model_path, BANNER_GEN_MODEL_MAPPER[self.model_name]['superes']),
                os.path.join(self.model_path, BANNER_GEN_MODEL_MAPPER[self.model_name]['saliency']))
            self.model = (model_superes, model_saliency, model_text, model_face)
        else:
            raise ValueError('Unknown model name')

    def generate_banners(self):
        seeds = [x + 1 for x in range(self.num_result)]
        screenshot_paths = html_paths = []

        if self.model_name == 'LayoutDETR':
            screenshot_paths, html_paths = generate_banners_layoutdetr(
                self.model,
                self.image_path,
                self.banner_content['contentStyle']['elements'],
                self.post_process,
                seeds,
                self.browser,
                os.path.join(os.path.dirname(os.path.abspath(__file__)), self.output_path)
            )
        elif self.model_name == 'InstructPix2Pix':
            screenshot_paths, html_paths = generate_banners_instructpix2pix(
                *self.model,  # Unpack the model tuple
                self.image_path,
                self.banner_content['contentStyle']['elements'],
                self.post_process,
                seeds,
                self.browser,
                os.path.join(os.path.dirname(os.path.abspath(__file__)), self.output_path)
            )
        elif self.model_name == 'RetrieveAdapter':
            screenshot_paths, html_paths = generate_banners_retrieveadapter(
                *self.model,  # Unpack the model tuple
                self.image_path,
                self.banner_content['contentStyle']['elements'],
                seeds,
                self.browser,
                os.path.join(os.path.dirname(os.path.abspath(__file__)), self.output_path)
            )

        return screenshot_paths, html_paths

    def run(self):
        self.validate_inputs()
        self.load_banner_content()
        self.update_banner_content()
        self.setup_browser()
        screenshot_paths, html_paths = self.generate_banners()
        print(f'Generated banner screenshot paths:\n {screenshot_paths}')
        print(f'Generated banner html paths:\n {html_paths}')
        self.browser.quit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate banners using one of the generation models')
    parser.add_argument('-mn', '--model_name', help='Model of choice: LayoutDETR, InstructPix2Pix, RetrieveAdapter',
                        default='LayoutDETR')
    parser.add_argument('-mp', '--model_path', help='Path to all the model files', required=True)
    parser.add_argument('-im', '--image_path', help='Image used as the banner background or foreground',
                        default='test/data/example1/burning.jpg')
    parser.add_argument('-bcp', '--banner_content_path', help='Detailed specification of the banner content in json,'
                                                             ' e.g. ad copy type, font family, font color, etc.',
                        default='test/data/example1/banner_content.json')
    parser.add_argument('-hdt', '--header_text', help='Banner header text.', default='')
    parser.add_argument('-bdt', '--body_text', help='Banner body text.', default='')
    parser.add_argument('-btt', '--button_text', help='Banner button text.', default='')
    parser.add_argument('-pp', '--post_process', help='the dictionary of post-process method to its probability',
                        default={'jitter': 5 / 6, 'horizontal_center_aligned': 2 / 3, 'horizontal_left_aligned': 1 / 3})
    parser.add_argument('-nr', '--num_result', help='Number of banner images to be generated', default=3)
    parser.add_argument('-op', '--output_path', help='Relative path to store the generated banners.', default='result')

    args = vars(parser.parse_args())

    # Initialize the BannerGenerator class and run
    banner_generator = BannerGenerator(
        model_name=args['model_name'],
        model_path=args['model_path'],
        image_path=args['image_path'],
        banner_content_path=args['banner_content_path'],
        header_text=args['header_text'],
        body_text=args['body_text'],
        button_text=args['button_text'],
        post_process=args['post_process'],
        num_result=int(args['num_result']),
        output_path=args['output_path']
    )

    banner_generator.run()
