import React from "react";
import HnBaseUrlContext from "../../contexts/HnBaseUrlContext";
import moment from "moment";

class CommentsContainer extends React.Component {
  state = { comments: [], loading: true };

  async componentDidMount() {
    const comments = [];
    const parentId = this.props.match.params.id;
    const parentEntityResponse = await fetch(
      this.context.url + `item/${parentId}.json`
    );
    const parentEntiy = await parentEntityResponse.json();
    for (let commentId of parentEntiy.kids) {
      const commentResponse = await fetch(
        this.context.url + `item/${commentId}.json`
      );
      const comment = await commentResponse.json();
      await this.getChildren(comment, 0);
      comments.push(comment);
    }
    this.setState({ comments, loading: false });
  }

  async getChildren(comment, level) {
    comment.level = level;
    if (comment.kids) {
      for (let kidId of comment.kids) {
        const kidResponse = await fetch(
          this.context.url + `item/${kidId}.json`
        );
        const kid = await kidResponse.json();
        if (!comment.hasOwnProperty("children")) {
          comment.children = [];
        }
        comment.children.push(kid);
        await this.getChildren(kid, ++level);
      }
    }
  }

  getMargin(level) {
    return { marginLeft: `${level * 10}px` };
  }

  renderComment(comment) {
    let kids = null;
    if (comment.children) {
      kids = comment.children.map(kid => this.renderComment(kid));
    }
    if (comment.text) {
      return (
        <div
          key={comment.id}
          className="comment"
          style={this.getMargin(comment.level)}
        >
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
          {kids}
        </div>
      );
    }
    return <></>;
  }

  render() {
    return (
      <div
        className={`comments-container ${
          this.state.loading ? "comments-container--loading" : ""
        }`}
      >
        {this.state.loading ? (
          <span className="loading-icon__emoji" role="img" aria-label="Loading">
            &#129526;
            <div className="loading-icon__subtext">Loading</div>
          </span>
        ) : (
          this.state.comments.map(comment => this.renderComment(comment))
        )}
      </div>
    );
  }
}
CommentsContainer.contextType = HnBaseUrlContext;

export default CommentsContainer;
