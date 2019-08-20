import React from "react";
import HnBaseUrlContext from "../../contexts/HnBaseUrlContext";
import moment from "moment";

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
      <div className="comments-container">
        {this.state.comments.map(comment => (
          <div key={comment.index} className="comment">
            <div className="comment__title">
              ▲ {comment.by} - {moment.unix(comment.time).fromNow()}
            </div>
            <div
              className="comment__content"
              dangerouslySetInnerHTML={{
                __html: comment.text
                  .replace(/(<? *script)/gi, "illegalscript")
                  .replace(/<a/gi, '<a class="comment__hyperlink" ')
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
CommentsContainer.contextType = HnBaseUrlContext;

export default CommentsContainer;
