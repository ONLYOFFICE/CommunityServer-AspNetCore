import React from "react";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import { tablet } from "@appserver/components/src/utils/device";

const StyledArticleHeader = styled.div`
  border-bottom: 1px solid #eceef1;
  height: 56px;

  @media ${tablet} {
    display: none;
  }
`;

class ArticleHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    //console.log("PageLayout ArticleHeader render");
    return <StyledArticleHeader {...this.props} />;
  }
}

ArticleHeader.displayName = "ArticleHeader";

export default ArticleHeader;