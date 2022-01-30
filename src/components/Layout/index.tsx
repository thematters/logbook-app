import { Head } from "~/components";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head />

      <div className="l-container">
        <main className="l-row">
          <article className="l-col-full">{children}</article>
        </main>
      </div>
    </>
  );
};
