import { socialLinks } from "@/constants";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-purple-600">Job Portal</h2>
            <p className="text-sm text-gray-600">
              © 2024 Job Portal. All rights reserved.
            </p>
          </div>

          <div>
            <ul className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <li className="flex items-center gap-x-2.5" key={link.name}>
                  <link.Icon />
                  <span className="tracking-wider">{link.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
