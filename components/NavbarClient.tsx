"use client";

import Link from "next/link";
import { useState } from "react";
import SignoutButton from "./SignoutButton";

interface NavbarClientProps {
  user: object | null;
  isLead: boolean;
}

export default function NavbarClient({ user, isLead }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-800">DevTodo</span>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-6">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
                  >
                    Dashboard
                  </Link>
                  {isLead ? (
                    <>
                      <Link
                        href="/task/new"
                        className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
                      >
                        Buat Task
                      </Link>
                    </>
                  ) : null}

                  <SignoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 transition-colors "
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 transition-colors text-center"
                >
                  Dashboard
                </Link>
                {isLead ? (
                  <>
                    <Link
                      href="/task/new"
                      className="block text-gray-700 hover:text-gray-900 transition-colors text-center"
                    >
                      Buat Task
                    </Link>
                  </>
                ) : null}
                <div onClick={() => setIsOpen(false)} className="text-center">
                  <SignoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 transition-colors text-center"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
