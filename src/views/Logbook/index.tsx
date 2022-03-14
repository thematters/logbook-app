import Link from "next/link";
import { Head, Button } from "~/components";

import { Nav } from "./Nav";

import { EmptyBook } from "./EmptyBook";

const Logbook: React.FC = () => {
  // TODO: read logbook token id from query string
  const tokenID = "11550";
  return (
    <>
      <Head title="Logbook" />

      {/* <h1>Logbook Detail</h1>

      <Button />

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="library">Library</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
      </ul> */}
      <EmptyBook tokenID={tokenID} />
    </>
  );
};

export default Logbook;
