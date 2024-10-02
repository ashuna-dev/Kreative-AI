import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Import the logo images
import Logo from "/Users/manaskumar/Desktop/GenAI/Kreative-AI/components/layout/Black and White Modern Monochrome Initial K Logo-2 (2).jpeg"; 
import LogoText from "/Users/manaskumar/Desktop/GenAI/Kreative-AI/components/layout/Black and White Modern Monochrome Initial K Logo-2 (1).jpeg"; // Replace with the path to your logo text image

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex items-center">
              {/* Replace the logo text with the logo images */}
              <Image
                src={Logo} // Logo image path
                alt="Logo"
                width={80} // Set desired width
                height={80} // Set desired height
                className="mr-2"
              />
              <Image
                src={LogoText} // Logo text image path
                alt="Logo Text"
                width={150} // Set desired width
                height={40} // Set desired height
                className="ml-2"
              />
            </Link>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <Link href="https://github.com/your-repo-link" className="opacity-60 hover:opacity-100">
                GitHub
              </Link>
            </div>

            <div>
              <Link href="https://twitter.com/yourhandle" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>

            <div>
              <Link href="https://instagram.com/yourhandle" className="opacity-60 hover:opacity-100">
                Instagram
              </Link>
            </div>
          </div>

          {/* Platforms Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Platforms</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Web
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                iOS
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Android
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Help</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </Link>
            </div>
          </div>

          {/* Social Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2024 Designed and developed by 
            <Link
              target="_blank"
              href="https://github.com/your-github-profile"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              2-Bit
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
