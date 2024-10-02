import google.generativeai as genai
import os
from diffusers import StableDiffusionPipeline
import torch
from PIL import Image

# Configure the Gemini API key
genai.configure(api_key="AIzaSyAHR1jdjWT1CF3rGoNhyRmJbEWjbi5GMMw")
model = genai.GenerativeModel('gemini-1.5-flash')

# Load the product image (replace with your actual image path)
image_path = '/Users/manaskumar/Desktop/GenAI/306926.png'  # Replace this with the actual image path
product_image = genai.upload_file(path=image_path, display_name="Product Image")

# Define the prompt for Gemini API to generate a detailed banner prompt
gemini_prompt = f"""
Analyze this product image for banner generation. Focus on key product features such as:
- Product name, category, and primary features.
- Color palette and visual elements in the image.
- Use-case scenarios or target audience based on the image context.
- Generate a detailed prompt for Stable Diffusion that suggests a background theme, including style, color schemes, and positioning of the product image.

Make the response concise, up to 20 words, and ensure no text is included in the background.
"""

# Use the model to generate a response based on the image
response = model.generate_content([gemini_prompt, product_image])
generated_prompt = response.text.strip()

def generate_banner_background(generated_prompt, product_image_path, output_path):
    # Initialize the Stable Diffusion img2img pipeline
    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float32).to('cpu')  # Use 'mps' for Mac

    # Load the product image as a base for img2img
    base_image = Image.open(product_image_path).convert("RGB")  # Convert to RGB
    base_image = base_image.resize((512, 512), Image.LANCZOS)  # Resize for better compatibility

    # Generate a background image based on the prompt and the base image
    # Convert the image to a format compatible with the pipeline
    background = pipe(prompt=generated_prompt, init_image=base_image, strength=0.75).images[0]  # Adjust strength for more or less influence from the base image

    # Load and overlay product image onto generated background
    product_img = Image.open(product_image_path).convert("RGBA")
    background = background.convert("RGBA")
    
    # Resize the product image for better placement
    product_img.thumbnail((300, 300), Image.LANCZOS)  # Adjust size as necessary

    # Optimal product placement - using rule of thirds
    bg_width, bg_height = background.size
    product_x = int(bg_width * 0.7)  # Position product towards the right
    product_y = int(bg_height * 0.5)  # Center vertically

    # Paste the product image on the background
    background.paste(product_img, (product_x, product_y), product_img)

    # Save the final banner
    background.save(output_path)
    print(f"Banner background generated and saved to {output_path}")

# Specify output path for the banner
output_banner_path = "output_banner.png"
generate_banner_background(generated_prompt, image_path, output_banner_path)
