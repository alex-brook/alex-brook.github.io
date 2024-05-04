FROM debian:bookworm

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV GUILE_LOAD_PATH="/usr/local/share/guile/site/2.2${GUILE_LOAD_PATH:+:}$GUILE_LOAD_PATH"
ENV GUILE_LOAD_COMPILED_PATH="/usr/local/lib/guile/2.2/site-ccache${GUILE_LOAD_COMPILED_PATH:+:}$GUILE_COMPILED_LOAD_PATH"

COPY install.sh /install.sh
RUN /install.sh

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

WORKDIR /src
