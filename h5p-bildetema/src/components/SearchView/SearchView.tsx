import React from "react";

type SearchViewProps = {
  setIsTopicRouteFalse: () => void;
};

const SearchView = ({ setIsTopicRouteFalse }: SearchViewProps): JSX.Element => {
  setIsTopicRouteFalse();

  return <div>SearchView</div>;
};

export default SearchView;
