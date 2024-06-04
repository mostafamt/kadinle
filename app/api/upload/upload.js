async function uploadFile(formData, action) {
  const headers = new Headers();
  headers.append(
    "key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI"
  );
  headers.append("user_id", formData.get("user_id"));

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(
    `https://kadinle.com/api/${action}`,
    requestOptions
  );
  return response?.json();
}

export const uploadCommentMedia = async ({ userId, commentId, file }) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("comment_ud", commentId);
  formData.append("file", file);
  return await uploadFile(formData, "uploadProduct");
};

export const uploadUserAvatar = async ({ userId, file }) => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("file", file);
  return await uploadFile(formData, "uploadAvatar");
};
export const uploadReturnImage = async ({
  user_id,
  order_id,
  variant_id,
  file,
}) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("order_id", order_id);
  formData.append("variant_id", variant_id);
  formData.append("file", file);
  return await uploadFile(formData, "uploadReturn");
};
