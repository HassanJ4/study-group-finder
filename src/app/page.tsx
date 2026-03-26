import Image from "next/image";

export default function home() {
  return (
    <div>
      <h1>Hello</h1>
      <Image src="/logo.png" alt="My photo" width={500} height={500} />
    </div>
  );
}
