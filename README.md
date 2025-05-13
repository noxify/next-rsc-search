# Next RSC Search

This repo is just a POC based on

- NextJS 15
- Tailwind V4 w/ shadcn
- [React Query Builder](https://react-querybuilder.js.org/) with [shadcn components](https://github.com/jide/react-querybuilder-shadcn-ui) as advanced filter
- [Bazza Data Table Filter](https://ui.bazza.dev/docs/data-table-filter) as simple filter
- [OpenStatus](https://data-table.openstatus.dev/) DataTable to render the table ( based on their "Infinite Data-Table" example)
- [nuqs](https://nuqs.47ng.com/) to handle the query parameters
- [Prisma](https://www.prisma.io/) as ORM

## Use Case

Previously, this repository just contained the react query builder integration, but sometimes the user doesn't need a complex filter.

With this POC I want to show an approach how to solve this.

I love the flexibility which we get with the react-query-builder, but from an user perspective, you have to click a lot to get the data filtered.

I checked some implementations and the goal is to have **one** schema for the url parameters and if there is a complex query which can't be handled in the simple filter,
we just disable the option to switch to the simple filter.

You may know this behaviour from JIRA or other software.

## Credits

Previously, I have used [TableCN](https://tablecn.com/) to render the data table.

We also use their schema as base, I just converted it into a prisma schema.
