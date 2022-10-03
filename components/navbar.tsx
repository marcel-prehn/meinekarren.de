import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menu</span>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-xl">
              <Link href={"/"}>MeineKarren.de</Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {user ? (
                  <>
                    <Link href="/vehicles">
                      <a className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose">Übersicht</a>
                    </Link>
                    <Link href="/new">
                      <a className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose">Fahrzeug eintragen</a>
                    </Link>
                    {/* <Link href="/stats">
                    <a className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose">Statistik</a>
                  </Link> */}
                    <Link href="/api/auth/logout">
                      <a className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose">Abmelden</a>
                    </Link>
                  </>
                ) : (
                  <Link href="/api/auth/login">
                    <a className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose">Anmelden</a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="text-white hover:bg-yellow hover:text-black px-3 py-2 rounded-md text-md leading-loose"></div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* <span className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray">
            <Link href="/stats">Statistik</Link>
          </span> */}
          {user ? (
            <div>
              <span className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray">
                <Link href="/vehicles">Übersicht</Link>
              </span>
              <span className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray">
                <Link href="/new">Fahrzeug eintragen</Link>
              </span>
              <span className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray">
                <Link href="/api/auth/logout">Abmelden</Link>
              </span>
            </div>
          ) : (
            <div>
              <span className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray">
                <Link href="/api/auth/login">Anmelden</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
