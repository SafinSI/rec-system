import React from "react";

export const articleDataSelector = (item) => {
  return {
    id: item.id,
    rating: item.rating,
    recommendation_rating: item.recommendation_rating,
    name: (
      <a
        className="link"
        rel="noreferrer"
        target="_blank"
        href={item.article.full_url}
      >
        {item.article.name}
      </a>
    ),
    classification_label: item.classification_label.name,
  };
};
