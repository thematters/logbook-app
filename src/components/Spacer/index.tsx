import styles from "./styles.module.css";

interface SpacerProps {
  size?: "xTight" | "base" | "loose" | "xLoose" | "xxLoose" | "xxxLoose";
}

export const Spacer: React.FC<SpacerProps> = ({ size = "loose" }) => (
  <div className={styles[size]} aria-hidden />
);
