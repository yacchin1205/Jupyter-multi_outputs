FROM andrewosh/binder-base

MAINTAINER https://github.com/NII-cloud-operation

RUN mkdir /tmp/multi_outputs
COPY . /tmp/multi_outputs/
RUN cd /tmp/multi_outputs; /home/main/anaconda2/bin/pip install . && \
    jupyter nbextension install --py lc_multi_outputs --user && \
    jupyter nbextension enable --py lc_multi_outputs --user
