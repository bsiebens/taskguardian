[![CodeQL](https://github.com/bsiebens/taskguardian/actions/workflows/codeql.yml/badge.svg)](https://github.com/bsiebens/taskguardian/actions/workflows/codeql.yml) [![Docker](https://github.com/bsiebens/taskguardian/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/bsiebens/taskguardian/actions/workflows/docker-publish.yml)

# Taskguardian

Taskguardian is a web interface for using the awesome taskwarrior command line application. Taskguardian was heavily inspired by the great [taskwarrior-webui](https://github.com/DCsunset/taskwarrior-webui), but created out of a desire to:

- Create something using the svelte toolkit as a way teaching myself svelte (and frontend frameworks in general)
- Some personal modifications I intend/plan to make to fit more in my personal way of working

Taskguardian relies on a locally installed and working instance of taskwarrior and will work directly with the tasks you already have.

## Screenshots

Still need to be added (once I get round to making some, because everybody likes screenshots).

## Missing features

At one point in time these should be converted into issues ...

- [ ] Blocked tasks: the UI can identify tasks that are blocked by other tasks, but the blocking tasks are not identified or visible. There is also no way to add a dependent task using the web interface
- [ ] Automatic syncing: syncing with a taskserver requires a manual click in the user interface
- [ ] No mobile view, some pieces of the UI are adapted to mobile screen, but the table will just display in full requiring users to scroll (far) too the right to see all information

## Roadmap

At one point in time these should be converted into feature requests ...

- [ ] Creation of an inbox feature, allowing for quick creation of new tasks by just a description. New tasks are collected in a central inbox for further processing and tagging (for example can be at the end of the day, week, ...)
- [ ] Allowing for a way to include more information than just a text annotation

# Running Taskguardian

Taskguardian is bundled as Docker container. To run you can pull the docker image using (replace latest with vx.x.x to get a specific version):

`docker pull watcher1987/taskguardian:latest`

Then run with the following command:

`docker run -d -p 8080:80 --name taskguardian -v $HOME/.taskrc:/.taskrc -v $HOME/.task:/.task watcher1987/taskguardian:latest`
