import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Backdrop, NewPageLayout as NPL, Loader } from "asc-web-components";
import { ArticleHeaderContent, ArticleMainButtonContent, ArticleBodyContent } from '../../Article';
import { SectionHeaderContent, SectionBodyContent } from './Section';
import { setProfile, fetchProfile, resetProfile } from '../../../store/profile/actions';
import { isAdmin, isMe } from '../../../store/auth/selectors';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBackdropVisible: false,
      isArticleVisible: false,
      isArticlePinned: false
    }

    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.onPinArticle = this.onPinArticle.bind(this);
    this.onUnpinArticle = this.onUnpinArticle.bind(this);
    this.onShowArticle = this.onShowArticle.bind(this);
  }

  onBackdropClick() {
    this.setState({
      isBackdropVisible: false,
      isArticleVisible: false,
      isArticlePinned: false
    });
  }

  onPinArticle() {
    this.setState({
      isBackdropVisible: false,
      isArticleVisible: true,
      isArticlePinned: true
    });
  }

  onUnpinArticle() {
    this.setState({
      isBackdropVisible: true,
      isArticleVisible: true,
      isArticlePinned: false
    });
  }

  onShowArticle() {
    this.setState({
      isBackdropVisible: true,
      isArticleVisible: true,
      isArticlePinned: false
    });
  }

  componentDidMount() {
    const { match, fetchProfile } = this.props;
    const { userId } = match.params;

    fetchProfile(userId);
  }

  componentDidUpdate(prevProps) {
    const { match, fetchProfile } = this.props;
    const { userId } = match.params;
    const prevUserId = prevProps.match.params.userId;

    if (userId !== prevUserId) {
      fetchProfile(userId);
    }
  }

  componentWillUnmount() {
    this.props.resetProfile();
  }

  render() {
    console.log("Profile render")

    const { isBackdropVisible, isArticleVisible, isArticlePinned } = this.state;
    const { profile, auth, isAdmin, match } = this.props;
    const { userId } = match.params;
    return (
      profile
        ? <>
          <Backdrop visible={isBackdropVisible} onClick={this.onBackdropClick} />
          <NPL.Article visible={isArticleVisible} pinned={isArticlePinned}>
            <NPL.ArticleHeader visible={isArticlePinned}>
              <ArticleHeaderContent />
            </NPL.ArticleHeader>
            <NPL.ArticleMainButton>
              <ArticleMainButtonContent />
            </NPL.ArticleMainButton>
            <NPL.ArticleBody>
              <ArticleBodyContent />
            </NPL.ArticleBody>
            <NPL.ArticlePinPanel pinned={isArticlePinned} pinText="Pin this panel" onPin={this.onPinArticle} unpinText="Unpin this panel" onUnpin={this.onUnpinArticle} />
          </NPL.Article>
          <NPL.Section>
            <NPL.SectionHeader>
              <SectionHeaderContent profile={profile} />
            </NPL.SectionHeader>
            <NPL.SectionBody>
              <SectionBodyContent profile={profile} isAdmin={isAdmin} isSelf={isMe(auth.user, userId)} />
            </NPL.SectionBody>
            <NPL.SectionToggler visible={!isArticlePinned} onClick={this.onShowArticle} />
          </NPL.Section>
        </>
        : <>
          <NPL.Section>
            <NPL.SectionBody>
              <Loader className="pageLoader" type="rombs" size={40} />
            </NPL.SectionBody>
          </NPL.Section>
        </>
    );
  };
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object,
  isLoaded: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    isAdmin: isAdmin(state.auth.user),
    profile: state.profile.targetUser
  };
}

export default connect(mapStateToProps, {
  setProfile,
  fetchProfile,
  resetProfile
})(Profile);