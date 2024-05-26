import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <><h1>Home Page</h1>
      <Link href="/cart" legacyBehavior>
        <a>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Go to Cart</button>
        </a>
      </Link></>
  );
}
