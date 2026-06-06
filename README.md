# The Map of the Unknown

This project organises open questions from physics, cosmology, particle physics,
information theory, mathematics and consciousness into a **web of mysteries**.
Each node in the network represents an unresolved question and edges
indicate connections between them. By visualising and augmenting this map, you
can begin to see how seemingly disparate problems often point to deeper
structures in our understanding of reality. The project draws inspiration from
a conversation reflecting on how humanity’s greatest theories still contain
cracks and how uncovering the **unknown** is itself a noble pursuit【
fileciteturn0file0L33-L45】.

## How it works

The front‑end is a simple static page built with HTML, CSS and
[D3.js](https://d3js.org/) for rendering a force‑directed graph. The initial
dataset consists of a handful of canonical open questions curated from
trustworthy sources. Each question includes:

* **Question** – the core mystery.
* **Why it matters** – a brief explanation of its significance.
* **Current leading ideas** – prevailing hypotheses or approaches.
* **Assumptions** – key assumptions underpinning current thinking.
* **Connections** – links to other questions that appear related.

Users can add their own questions via the form on the right side of the
interface. New entries require selecting a category, supplying descriptive
fields and optionally connecting the question to existing nodes. Custom
questions are persisted in the browser’s `localStorage` so they remain on
subsequent visits.

## Initial data sources

The initial list of open questions was assembled from widely cited sources,
including:

* John Baez’s **Open Questions in Physics** list, which highlights foundational
  puzzles such as the measurement problem and the search for a quantum
  computer【551633113154856†L66-L80】.
* The **Quantum gravity** section of the Wikipedia entry on unsolved problems in
  physics, which emphasises the challenge of unifying quantum mechanics and
  general relativity and the problem of time【909088187794837†L243-L277】.
* Cosmology puzzles like cosmic inflation, dark matter and dark energy
  documented in the same Wikipedia list【909088187794837†L294-L337】.
* Particle physics mysteries including the hierarchy problem, magnetic
  monopoles and neutrino masses【909088187794837†L344-L400】.
* Mathematical Millennium Prize Problems such as the P vs NP problem【837152102850054†L74-L104】,
  the Riemann hypothesis【128795637839510†L245-L279】 and the Navier–Stokes existence and
  smoothness problem【551633113154856†L54-L64】.
* The **hard problem of consciousness**, which asks why physical processes
  generate subjective experience【79714064107532†L174-L196】.

These citations are provided both to credit the original authors and to serve
as starting points for readers who wish to delve deeper. Whenever you add
further questions, consider annotating them with similar references.

## Developing locally

To run the map locally, open `index.html` in a modern web browser. No build
steps or servers are required. If you wish to reset the map (removing all
custom questions), clear the `localStorage` for the site in your browser’s
developer tools.

## Deploying

This repository is intended to be deployed on Vercel as a static site. Simply
connect your GitHub repo to Vercel and trigger a deployment. Vercel will
detect the static content and serve `index.html` as the entry point.