import { client } from "@/sanity/client";
import { Category } from "@/utils/interface";
import Link from "next/link";
// import logo from "@/assets/images/logo.svg";

const Footer = async () => {
  const categories: Category[] = await client.fetch(
    `*[_type == "category"]|order(_createdAt asc){
        _id,
        title,
        description,
        slug
      }`
  );

  return (
    <footer className="bg-gray-900 text-white lg:py-16 py-8">
      <div className="w-full md:w-[80%] max-w-[2024px] mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-8 lg:mb-0 lg:w-1/3">
            <Link href="/">
              {/* <div
                className={`w-[200px] transition-all duration-300 h-[50px]  bg-contain bg-center bg-no-repeat`}
                style={{ backgroundImage: `url('${logo.src}')` }}
              /> */}
              <p className="text-primary my-2 font-bold text-md md:text-2xl">ThreadIt</p>
            </Link>
            <p className="text-gray-400 w-full lg:max-w-[300px]">
              Your go-to blog for the latest trends in fashion, sustainability,
              and eco-friendly living.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 lg:mb-0 lg:w-1/3">
            <h3 className="text-xl font-bold mb-2">Sections</h3>
            <ul className="text-gray-400">
              {categories.map((category) => (
                <li key={category._id} className="my-2">
                  <Link
                    href={`/postList/${category?.slug.current}`}
                    className="hover:underline"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
              <li className="my-2">
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:w-fit lg:w-1/3">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-400 mb-1 my-2">Email: info@threadit.com</p>
            <p className="text-gray-400 mb-1 my-2">Phone: +123 456 7890</p>
            <p className="text-gray-400 my-2">
              Address: 123 Fashion St, Trend City
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-4">
          {/* Instagram */}
          <Link
            href="https://instagram.com/threaditng"
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.25-2.5a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
            </svg>
          </Link>
          {/* linkedin */}
          <Link
            href="https://linkedin.com/company/threaditeco"
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.351c.733 0 1.324-.591 1.324-1.324v-21.351c0-.733-.591-1.325-1.324-1.325zm-13.675 20.5h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.5c0-1.378-1.122-2.5-2.5-2.5s-2.5 1.122-2.5 2.5v5.5h-3v-10h3v1.5c.878-1.317 2.5-1.5 3.5-1.5 2.485 0 4.5 2.015 4.5 4.5v5.5z" />
            </svg>
          </Link>
          {/* x */}
          <Link
            href="https://x.com/threaditng"
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.92 0 .386.044.762.128 1.124-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.558-.246-2.218-.616v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.315 0-.623-.031-.923-.088.624 1.951 2.432 3.374 4.576 3.414-1.676 1.314-3.791 2.098-6.086 2.098-.395 0-.785-.023-1.17-.068 2.169 1.391 4.743 2.204 7.514 2.204 9.014 0 13.944-7.471 13.944-13.944 0-.213-.005-.426-.014-.637.959-.693 1.792-1.56 2.448-2.548z" />
            </svg>
          </Link>
          {/* pintrest */}
          <Link
            href="https://www.pinterest.com/threaditlogin/"
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.488 0-9.837 4.449-9.837 9.837 0 4.354 2.829 8.065 6.737 9.387-.092-.8-.175-2.03.036-2.91.191-.8 1.229-5.1 1.229-5.1s-.314-.628-.314-1.556c0-1.456.847-2.544 1.9-2.544.896 0 1.328.672 1.328 1.479 0 .9-.571 2.244-.865 3.491-.246 1.04.521 1.888 1.547 1.888 1.856 0 3.287-1.957 3.287-4.779 0-2.497-1.797-4.243-4.366-4.243-2.973 0-4.715 2.229-4.715 4.532 0 .9.344 1.865.774 2.388.086.1.1.188.075.288-.082.344-.271 1.1-.308 1.253-.048.2-.157.244-.364.147-1.356-.628-2.207-2.6-2.207-4.188 0-3.408 2.478-6.54 7.153-6.54 3.753 0 6.676 2.675 6.676 6.244 0 3.728-2.348 6.72-5.6 6.72-1.092 0-2.118-.568-2.468-1.239l-.672 2.558c-.243.928-.9 2.09-1.342 2.798 1.01.312 2.075.48 3.188.48 5.488 0 9.837-4.449 9.837-9.837s-4.449-9.837-9.837-9.837z" />
            </svg>
          </Link>
        </div>
      </div>
      <hr className="my-4 border-slate-600" />
      <div className="text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Thread It. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
