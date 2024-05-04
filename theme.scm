(define-module (theme)
  #:use-module (haunt artifact)
  #:use-module (haunt builder blog)
  #:use-module (haunt html)
  #:use-module (haunt post)
  #:use-module (haunt site)
  #:use-module (srfi srfi-19)

  #:export (blog-theme))

(define (layout site title body)
  `((doctype "html")
    (head
      (meta (@ (charset "utf-8"))))
      (meta (@ (name "viewport") (content "width=device-width, initial-scale=1")))
      (link (@ (rel "preconnect") (href "https://fonts.googleapis.com")))
      (link (@ (rel "preconnect") (href "https://fonts.gstatic.com") (crossorigin "")))
      (link (@ (rel "stylesheet") (href "https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Fira+Mono:wght@400;500;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap")))
      (link (@ (rel "stylesheet") (media "(prefers-color-scheme: light)") (href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-light.min.css")))
      (link (@ (rel "stylesheet") (media "(prefers-color-scheme: dark)") (href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-dark.min.css")))
      (link (@ (rel "stylesheet") (href "/assets/index.css")))
      (script (@ (src "/assets/index.js")))
    (body
      (nav
        (a (@ (href "/")) "Home"))
      (main ,body))))

(define (post-template post)
  `((header (h2 ,(post-ref post 'title) )
            (div (@ (class "metadata"))
              (span ,(date->string (post-date post) "~B ~d, ~Y"))
              (ul (@ (class "tags"))
                ,@(map (lambda (tag) `(li (@ (class "tag")) ,tag)) (assq-ref (post-metadata post) 'tags)))))
    (article ,(post-sxml post))))

(define (collection-template site title posts prefix)
  `((h1 ,title)
    ,(map (lambda (post)
      (let* ((post-uri (string-append prefix "/" (site-post-slug site post) ".html"))
             (post-title (post-ref post 'title)))
        `(a (@ (href ,post-uri)) ,post-title)))
      posts)))

(define blog-theme
  (theme
    #:name "Blog"
    #:layout layout
    #:post-template post-template
    #:collection-template collection-template))
