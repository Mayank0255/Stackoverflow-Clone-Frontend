import React from "react";

import { ReactComponent as EditLogo } from "../../../../../assets/Edit.svg";

export const SideBarWidgetData = [
  {
    type: 'header',
    title: 'The Overflow Blog'
  },
  {
    type: 'item',
    title: 'Celebrating the Stack Exchange sites that turned ten years old in Q1 2022',
    icon: <EditLogo/>,
    link: 'https://stackoverflow.blog/2022/03/16/celebrating-the-stack-exchange-site-that-turned-ten-years-old-in-q1-2022'
  },
  {
    type: 'item',
    title: 'New data: What makes developers happy at work',
    icon: <EditLogo/>,
    link: 'https://stackoverflow.blog/2022/03/17/new-data-what-makes-developers-happy-at-work'
  },
  {
    type: 'header',
    title: 'Featured on Meta'
  },
  {
    type: 'item',
    title: 'What goes into site sponsorships on SE?',
    icon: <div className="favicon favicon-stackexchangemeta" title="Meta Stack Exchange"/>,
    link: 'https://meta.stackexchange.com/questions/376530/what-goes-into-site-sponsorships-on-se'
  },
  {
    type: 'item',
    title: 'Stack Exchange Q&amp;A access will not be restricted in Russia',
    icon: <div className="favicon favicon-stackexchangemeta" title="Meta Stack Exchange"/>,
    link: 'https://meta.stackexchange.com/questions/376743/stack-exchange-qa-access-will-not-be-restricted-in-russia'
  },
  {
    type: 'item',
    title: 'Announcing an A/B test for a Trending sort option',
    icon: <div className="favicon favicon-stackoverflowmeta" title="Meta Stack Overflow"/>,
    link: 'https://meta.stackoverflow.com/questions/416486/announcing-an-a-b-test-for-a-trending-sort-option'
  },
  {
    type: 'item',
    title: 'New User Experience: Deep Dive into our Research on the Staging Ground – How...',
    icon: <div className="favicon favicon-stackoverflowmeta" title="Meta Stack Overflow"/>,
    link: 'https://meta.stackoverflow.com/questions/416652/new-user-experience-deep-dive-into-our-research-on-the-staging-ground-how-do'
  },
  {
    type: 'header',
    title: 'Hot Meta Posts'
  },
  {
    type: 'item',
    title: 'Changing initializer-list tag wiki',
    icon: <span className="fc-black-500" title="Question score (upvotes - downvotes)">16</span>,
    link: 'https://meta.stackoverflow.com/questions/416623/changing-initializer-list-tag-wiki'
  },
  {
    type: 'item',
    title: 'What is the true intention in the "How to reference material written by...',
    icon: <span className="fc-black-500" title="Question score (upvotes - downvotes)">10</span>,
    link: 'https://meta.stackoverflow.com/questions/416665/what-is-the-true-intention-in-the-how-to-reference-material-written-by-others'
  },
]