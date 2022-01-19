import React from "react";
import classnames from "classnames";
import BootStrapCard from "react-bootstrap/Card";
import style from "./card.less";

function Card({ title, renderDescription }) {
  return (
    <BootStrapCard className={classnames("mb-3 bg-light", style.clearCard)}>
      <BootStrapCard.Body>
        <div className={classnames("text-center my-4", style.setCardTitle)}>
          {title}
        </div>
        {renderDescription}
      </BootStrapCard.Body>
    </BootStrapCard>
  );
}

export default Card;
