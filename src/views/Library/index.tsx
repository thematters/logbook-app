import Link from "next/link";
import { Head } from "~/components";

const Library: React.FC = () => {
  return (
    <>
      <Head title="Library" />

      <h1>Library</h1>

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="logbook">Logbook Detail</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
      </ul>
    </>
  );
};

export default Library;
