import React from "react";
import HnBaseUrlContext from "../../contexts/HnBaseUrlContext";

class CommentsContainer extends React.Component {
  state = { comments: [] };

  async componentDidMount() {
    const comments = [];
    const parentId = this.props.match.params.id;
    const parentEntityResponse = await fetch(
      this.context.url + `item/${parentId}.json`
    );
    const parentEntiy = await parentEntityResponse.json();
    parentEntiy.kids.forEach(async commentId => {
      const commentResponse = await fetch(
        this.context.url + `item/${commentId}.json`
      );
      const comment = await commentResponse.json();
      comments.push(comment);
      this.setState({ comments });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.comments.map(comment =>
          <div key={comment.index}>
            {comment.text}
          </div>
        )}
      </React.Fragment>
    );
  }
}
CommentsContainer.contextType = HnBaseUrlContext;

export default CommentsContainer;
