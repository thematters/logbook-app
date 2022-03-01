import styles from "./styles.module.css";

const Footer = () => (
  <footer>
    <div>
      <div>2022, Designed by Matters.</div>
    </div>

    <div>
      <div>
        <a href="https://matters.news">Matters</a>
      </div>
      <div>Opensea</div>
      <div>Instagram</div>
      <div>Facebook</div>
      <div>Twitter</div>
      <div>Discord</div>
      <div>Telegram</div>
    </div>

    <style global jsx>{`
      footer {
        display: flex;
        justify-content: space-between;

        background-color: var(--color-gradient-green-start);
        background-image: linear-gradient(
          0deg,
          var(--color-gradient-green-start),
          var(--color-gradient-green-end)
        );
        background-size: 100%;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }

      footer div {
        display: inline-flex;
      }

      footer div div {
        margin: 0 var(--spacing-xx-tight) 0 var(--spacing-xx-tight);
      }
    `}</style>
  </footer>
);

export default Footer;
