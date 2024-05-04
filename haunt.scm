(add-to-load-path (dirname (current-filename)))

(use-modules
  (haunt asset)
  (haunt builder blog)
  (haunt builder atom)
  (haunt builder assets)
  (haunt post)
  (haunt reader commonmark)
  (haunt site)
  (theme))

(site #:title "Built with Guile"
  #:domain "alex-brook.github.io"
  #:default-metadata '((author . "Alex Brook "))
  #:readers (list commonmark-reader)
  #:builders
    (list
      (blog
        #:theme blog-theme
        #:prefix "posts"
        #:collections `(("Posts" "index.html" ,posts/reverse-chronological)))
      (atom-feed)
      (static-directory "assets")))
