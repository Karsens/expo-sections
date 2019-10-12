export const fetchGhost = (
  { slug, labelSlug, ghostLink, ghostKey },
  config
) => {
  if (!ghostLink) {
    return;
  }

  const tags = labelSlug === slug ? labelSlug : `${labelSlug},${slug}`;
  const uri = config?.slug
    ? `${ghostLink}content/posts/slug/${config.slug}/?key=${ghostKey}`
    : `${ghostLink}content/posts/?key=${ghostKey}&limit=${
        config?.limit ? config.limit : "all"
    }&filter=tags:${tags}`;

  console.log("ghosturi", uri);
  return fetch(uri)
    .then(response => response.json())
    .then(({ posts }) => {
      return posts?.map(post => {
        const {
          id,
          created_at,
          title,
          html,
          excerpt,
          url,
          feature_image,
          slug
        } = post;

        return {
          id,
          date: created_at,
          html,
          title,
          description: excerpt,
          link: url,
          slug,
          figure: feature_image && feature_image.replace("http:", "https:")
        };
      });
    })
    .catch(e => console.log("e", e));
};
