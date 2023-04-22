# ---- Base Node ----
FROM node:lts as base
# set working directory
WORKDIR /app
# Set tini as entrypoint
COPY package.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --registry https://registry.npm.taobao.org
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install --registry https://registry.npm.taobao.org

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules ./node_modules
# copy app sources
COPY . .
RUN npm run build
# expose port and define CMD
EXPOSE 3000

CMD npm run start