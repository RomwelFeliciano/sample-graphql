import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#191b22]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#41aeda] px-2 text-sm rounded rotate-6 absolute -mt-14 mr-3">
        Page Not Found
      </div>
      <Link href={"/"}>
        <button className="mt-8">
          <span className="relative inline-block text-sm font-medium text-[#3177a5] group active:text-sky-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#3177a5] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#12151f] border border-current">
              Go Home
            </span>
          </span>
        </button>
      </Link>
    </main>
  );
}
