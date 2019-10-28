import React from 'react';
import { utils } from 'asc-web-components';
import { connect } from 'react-redux';
import {
  TreeMenu,
  TreeNode,
  Icons
} from "asc-web-components";
import { setNewSelectedNode } from '../../../../../store/auth/actions';
import { withRouter } from "react-router";
import { settingsTree } from '../../../../../helpers/constants';

const getItems = data => {
  return data.map(item => {
    if (item.children && item.children.length) {
      return (
        <TreeNode
          title={item.title}
          key={item.key}
          icon={item.icon && React.createElement(Icons[item.icon], {
            size: 'scale',
            isfill: true,
            color: 'dimgray',
          })}
        >
          {getItems(item.children)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        key={item.key}
        title={item.title}
        icon={item.icon && React.createElement(Icons[item.icon], {
          size: 'scale',
          isfill: true,
          color: 'dimgray',
        })}
      />
    );
  });
};

const getObjectForState = (key, title, subtitle, link) => {
  const selectedInfo = {
    selectedKey: key
  };
  return selectedInfo;
}

const getKeyByLink = (data, linkArr) => {
  const length = linkArr.length;
  if (length === 1 || !linkArr[1].length) {
    const arrLength = data.length;
    for (let i = 0; i < arrLength; i++) {
      if (data[i].link === linkArr[0]) {
        return data[i].children ? data[i].children[0].key : data[i].key;
      }
    }
  } else if (length === 2) {
    const arrLength = data.length;
    let key;

    for (let i = 0; i < arrLength; i++) {
      if (data[i].link === linkArr[0]) {
        key = i;
        break;
      }
    }

    const selectedArr = data[key].children;
    const childrenLength = selectedArr.length;
    for (let i = 0; i < childrenLength; i++) {
      if (selectedArr[i].link === linkArr[1]) {
        return selectedArr[i].key;
      }

    }
  }
  return '0-0';
}

const getSelectedLinkByKey = key => {
  const length = key.length;
  if (length === 1) {
    return '/' + settingsTree[key].link;
  }
  else if (length === 3) {
    return '/' + settingsTree[key[0]].link + '/' + settingsTree[key[0]].children[key[2]].link;
  }
}

class ArticleBodyContent extends React.Component {

  constructor(props) {
    super(props);

    const { selectedKeys, match, history } = props;
    const fullSettingsUrl = props.match.url;
    const locationPathname = props.location.pathname;

    if (locationPathname === fullSettingsUrl) {
      const newPath = match.path + getSelectedLinkByKey(selectedKeys[0]);
      history.push(newPath);
      return;
    }

    const fullSettingsUrlLength = fullSettingsUrl.length;

    const resultPath = locationPathname.slice(fullSettingsUrlLength + 1);
    const arrayOfParams = resultPath.split('/');

    const key = getKeyByLink(settingsTree, arrayOfParams);
    const link = getSelectedLinkByKey(key);

    this.sendNewSelectedData([key]);
    const path = match.path + link;
    history.push(path);
  }

  componentDidUpdate() {
    const { selectedKeys, match, history } = this.props;
    const settingsPath = getSelectedLinkByKey(selectedKeys[0]);
    const newPath = match.path + settingsPath;
    history.push(newPath);
  }

  shouldComponentUpdate(nextProps) {
    if (!utils.array.isArrayEqual(nextProps.selectedKeys, this.props.selectedKeys)) {
      return true;
    }

    return false;
  }

  sendNewSelectedData = (key, title, subtitle, link) => {
    const { setNewSelectedNode } = this.props;
    const data = getObjectForState(key, title, subtitle, link);
    setNewSelectedNode(data);
  }

  onSelect = value => {
    const { selectedKeys } = this.props;

    if (value) {
      if (utils.array.isArrayEqual(value, selectedKeys)) {

        return;
      }
      const selectedKey = value[0];
      if (selectedKey.length === 3) {
        this.sendNewSelectedData(value);
      }
      else if (selectedKey.length === 1 && (selectedKey.toString() !== selectedKeys.toString()[0] || selectedKeys.toString()[2] !== '0')) {
        const selectedKeys = settingsTree[value].children ? [`${value.toString()}-0`] : value;
        this.sendNewSelectedData(selectedKeys);
      }
    }
  };

  switcherIcon = obj => {
    if (obj.isLeaf) {
      return null;
    }
    if (obj.expanded) {
      return (
        <Icons.ExpanderDownIcon size="scale" isfill={true} color="dimgray" />
      );
    } else {
      return (
        <Icons.ExpanderRightIcon size="scale" isfill={true} color="dimgray" />
      );
    }
  };

  render() {
    const { selectedKeys } = this.props;

    console.log("SettingsTreeMenu", this.props);

    return (
      <TreeMenu
        className="people-tree-menu"
        checkable={false}
        draggable={false}
        disabled={false}
        multiple={false}
        showIcon={true}
        defaultExpandAll={true}
        switcherIcon={this.switcherIcon}
        onSelect={this.onSelect}
        selectedKeys={selectedKeys}
      >
        {getItems(settingsTree)}
      </TreeMenu>
    );
  };
};

function mapStateToProps(state) {
  return {
    selectedKeys: state.auth.settings.settingsTree.selectedKey
  };
}

export default connect(mapStateToProps, { setNewSelectedNode })(withRouter(ArticleBodyContent));