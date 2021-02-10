import React from "react";
//import { connect } from "react-redux";
//import { utils } from "asc-web-components";
import { toastr, Loaders } from "asc-web-common";
import TreeFolders from "./TreeFolders";
import TreeSettings from "./TreeSettings";
import isEmpty from "lodash/isEmpty";
import //fetchFiles,
//setIsLoading,
//setSelectedNode,
"../../../store/files/actions";
// import {
//   getTreeFolders,
//   getFilter,
//   getSelectedFolderTitle,
//   getSelectedTreeNode,
// } from "../../../store/files/selectors";
import { NewFilesPanel } from "../../panels";
import { setDocumentTitle } from "../../../helpers/utils";
import ThirdPartyList from "./ThirdPartyList";
import { inject, observer } from "mobx-react";

class ArticleBodyContent extends React.Component {
  constructor(props) {
    super(props);

    const { selectedFolderTitle, filter, treeFolders } = props;

    selectedFolderTitle
      ? setDocumentTitle(selectedFolderTitle)
      : setDocumentTitle();

    this.state = {
      expandedKeys: filter.treeFolders,
      data: treeFolders,
      showNewFilesPanel: false,
    };
  }

  // componentDidUpdate(prevProps) {
  //   const { filter, treeFolders } = this.props;

  //   if (
  //     filter.treeFolders.length !== prevProps.filter.treeFolders.length ||
  //     this.state.expandedKeys.length !== filter.treeFolders.length
  //   ) {
  //     this.setState({ expandedKeys: filter.treeFolders });
  //   }

  //   if (!utils.array.isArrayEqual(prevProps.treeFolders, treeFolders)) {
  //     this.setState({ data: treeFolders });
  //   }
  // }

  componentDidMount() {
    if (this.props.currentId) {
      const currentId = [this.props.currentId + ""];
      this.props.setSelectedNode(currentId);
    }
  }

  onSelect = (data, e) => {
    const {
      filter,
      setIsLoading,
      selectedTreeNode,
      setSelectedNode,
      fetchFiles,
    } = this.props;

    if (!selectedTreeNode || selectedTreeNode[0] !== data[0]) {
      setSelectedNode(data);
      setIsLoading(true);
      const newFilter = filter.clone();
      newFilter.page = 0;
      newFilter.startIndex = 0;

      const selectedFolderTitle =
        (e.node && e.node.props && e.node.props.title) || null;

      selectedFolderTitle
        ? setDocumentTitle(selectedFolderTitle)
        : setDocumentTitle();

      fetchFiles(data[0], newFilter)
        .catch((err) => toastr.error(err))
        .finally(() => setIsLoading(false));
    }
  };

  onShowNewFilesPanel = (folderId) => {
    const { showNewFilesPanel } = this.state;
    this.setState({
      showNewFilesPanel: !showNewFilesPanel,
      newFolderId: [folderId],
    });
  };

  setNewFilesCount = (folderPath, filesCount) => {
    const data = this.state.data;
    const dataItem = data.find((x) => x.id === folderPath[0]);
    dataItem.newItems = filesCount ? filesCount : dataItem.newItems - 1;
    this.setState({ data });
  };

  render() {
    const { treeFolders, onTreeDrop, selectedTreeNode } = this.props;
    const { showNewFilesPanel, expandedKeys, newFolderId } = this.state;

    return (
      <>
        {showNewFilesPanel && (
          <NewFilesPanel
            visible={showNewFilesPanel}
            onClose={this.onShowNewFilesPanel}
            setNewFilesCount={this.setNewFilesCount}
            folderId={newFolderId}
            treeFolders={treeFolders}
          />
        )}
        {isEmpty(treeFolders) ? (
          <Loaders.TreeFolders />
        ) : (
          <>
            <TreeFolders
              selectedKeys={selectedTreeNode}
              onSelect={this.onSelect}
              data={treeFolders}
              expandedKeys={expandedKeys}
              onBadgeClick={this.onShowNewFilesPanel}
              onTreeDrop={onTreeDrop}
            />
            <TreeSettings />
            <ThirdPartyList />
          </>
        )}
      </>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     treeFolders: getTreeFolders(state),
//     filter: getFilter(state),
//     selectedTreeNode: getSelectedTreeNode(state),
//     selectedFolderTitle: getSelectedFolderTitle(state),
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setIsLoading: (isLoading) => dispatch(setIsLoading(isLoading)),
//     setSelectedNode: (node) => dispatch(setSelectedNode(node)),
//     fetchFiles: (folderId, filter) => dispatch(fetchFiles(folderId, filter)),
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(ArticleBodyContent);
export default inject(({ store, mainFilesStore }) => {
  const { setIsLoading, filesStore } = mainFilesStore;
  const {
    fetchFiles,
    treeFoldersStore,
    selectedFolderStore,
    filter,
  } = filesStore;
  const { treeFolders, setSelectedNode } = treeFoldersStore;
  const selectedTreeNode = [selectedFolderStore.id + ""];

  return {
    selectedFolderTitle: selectedFolderStore.title,
    treeFolders,
    selectedTreeNode,
    filter,

    setIsLoading,
    fetchFiles,
    setSelectedNode,
  };
})(observer(ArticleBodyContent));
