import Document, { Html, Head, Main, NextScript } from "next/document";

class LogbookDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="lia3M50vaRwExj1rDvfv2C48aQ6-cnwxOhLZLex7rIo"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LogbookDocument;
