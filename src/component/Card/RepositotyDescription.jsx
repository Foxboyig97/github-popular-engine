import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faCodeBranch,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import BootStrapCard from "react-bootstrap/Card";
import AnchorBlank from "./AnchorBlank";
import style from "./card.less";

export default function RepositotyDescription({ item }) {
  return (
    <ul className={style.clearUlMp}>
      <li className="text-center">
        <BootStrapCard.Img
          className="avatar w-50"
          src={item?.owner?.avatar_url}
          alt={`Avatar for ${item?.owner?.login}`}
        />
      </li>

      <li className="my-4 text-center">
        <AnchorBlank className={style.repositotyName} to={item?.html_url}>
          {item?.name?.slice(0, 20)}
        </AnchorBlank>
      </li>

      <li className="mb-4 pb-4 repositoty-subtext">
        <div className={style.descriptionItem}>
          <FontAwesomeIcon icon={faUser} color="rgb(255, 191, 136)" />
          <AnchorBlank to={item?.owner?.html_url} className={style.authorName}>
            {item?.owner.login}
          </AnchorBlank>
        </div>
        <div className={style.descriptionItem}>
          <FontAwesomeIcon icon={faStar} color="rgb(255, 215, 0)" />
          <span>{item?.stargazers_count} stars</span>
        </div>
        <div className={style.descriptionItem}>
          <FontAwesomeIcon icon={faCodeBranch} color="rgb(129, 194, 245)" />
          <span>{item?.forks_count} forks</span>
        </div>
        <div className={style.descriptionItem}>
          <FontAwesomeIcon icon={faCode} color="rgb(241, 138, 147)" />
          <span>{item?.open_issues_count} open issues</span>
        </div>
      </li>
    </ul>
  );
}
