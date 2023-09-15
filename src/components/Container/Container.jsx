import { Date } from "../Date/Date";
import { Title } from "../Title/Title";

import "../Styles/Styles.css";

export const Container = () => {
  return (
    <section className="containerStyled">
      <Title title="APP NASA" />
      <Date />
      <div>
        <p className="styledFooter" >
          Copyright &copy; 2022 by Carolina Uribe Botero
        </p>
      </div>
    </section>
  );
};
