import { faDownload, faExclamationTriangle, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import BootStrapCard from "react-bootstrap/Card";
import AnchorBlank from "./AnchorBlank";
import style from "./card.less";

export default function PlayerDescription({ item }) {
  return (
    <ul className={style.clearUlMp}>
      <li className="text-center">
        <BootStrapCard.Img
          className="avatar w-50"
          src={item?.avatar_url}
          alt={`Avatar for ${item?.owner?.login}`}
        />
      </li>

      <li className="text-center mt-4">
        Score: {item?.followers + item?.public_gists}
      </li>

      <li className="my-3 text-center">
        <AnchorBlank className={style.repositotyName} to={item?.html_url}>
          {item?.login?.slice(0, 20)}
        </AnchorBlank>
      </li>

      <li className="mb-4 pb-4 repositoty-subtext">
        <div>
          <FontAwesomeIcon icon={faUser} color="rgb(255, 191, 136)" />
          {item?.login}
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} color="rgb(255, 215, 0)" />
          {item?.location || 0}
        </div>
        <div>
          <FontAwesomeIcon icon={faDownload} color="bule" />
          {item?.followers} followers
        </div>
        <div>
          <FontAwesomeIcon icon={faExclamationTriangle} color="orangered" />
          {item?.following} following
        </div>
      </li>
    </ul>
  );
}
