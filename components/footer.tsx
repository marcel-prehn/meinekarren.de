import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full text-center my-4 space-x-4">
      <span className="text-sm text-black">2022 MeineKarren.de</span>
      <span className="text-sm text-black">
        <Link href={"/impressum"}>Impressum</Link>
      </span>
      <span className="text-sm text-black">
        <Link href={"/datenschutz"}>Datenschutz</Link>
      </span>
    </div>
  );
};
