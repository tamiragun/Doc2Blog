import React from "react";

export const PublishSuccess = (fileName) => {
  // TODO generate button using routes instead of anchor link

  const blogUrl = `http://localhost:8080/api?fileName=${fileName.fileName}`;

  return (
    <div className="publish-success">
      <h3>You have successfully published your blog post!</h3>
      <a href={blogUrl} rel="noreferrer" target="_blank">
        View your blog post live
      </a>
    </div>
  );
};

export default PublishSuccess;
