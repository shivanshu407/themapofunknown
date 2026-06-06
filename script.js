/*
 * Map of the Unknown
 *
 * This script defines an initial set of unanswered questions drawn from
 * physics, cosmology, mathematics, information theory and consciousness.
 * It uses D3.js to display the questions as an interactive force-directed
 * network. A form allows users to add their own questions and specify
 * relationships to existing nodes. New questions are saved to localStorage
 * so that they persist across page reloads on the same machine.
 */

// Define the categories with display names and colours.
const categories = {
  quantum: { name: 'Quantum Mechanics', color: '#e74c3c' },
  relativity: { name: 'General Relativity', color: '#8e44ad' },
  cosmology: { name: 'Cosmology', color: '#2ecc71' },
  particle: { name: 'Particle Physics', color: '#f1c40f' },
  consciousness: { name: 'Consciousness', color: '#e67e22' },
  information: { name: 'Information Theory', color: '#3498db' },
  math: { name: 'Mathematics', color: '#1abc9c' }
};

// Initial set of unanswered questions. Each question has an id, category,
// short question text, a description of its importance, current leading ideas,
// assumptions and a list of ids to which it is connected. Citations for
// individual questions can be found in the README and code comments.
const initialQuestions = [
  {
    id: 'qm_measurement',
    category: 'quantum',
    question: 'What is a measurement in quantum mechanics?',
    importance:
      'The measurement problem probes the foundations of quantum mechanics, asking how and why a wavefunction appears to collapse when measured.',
    currentIdeas:
      'Interpretations like Copenhagen, many-worlds and decoherence offer different perspectives, but there is no consensus.',
    assumptions: 'Assumes the wavefunction is a complete description of a quantum system and that measurements give definite outcomes.',
    connections: []
  },
  {
    id: 'qm_quantum_computer',
    category: 'quantum',
    question: 'Can we build large-scale quantum computers?',
    importance:
      'Practical quantum computers could outperform classical computers on certain tasks, revolutionising computing and cryptography.',
    currentIdeas:
      'Research focuses on error correction, qubit coherence and scalable architectures; it remains uncertain if truly large-scale machines are feasible.',
    assumptions: 'Assumes quantum mechanics allows scalable entanglement and error rates can be suppressed sufficiently.',
    connections: ['math_p_vs_np']
  },
  {
    id: 'gr_quantum_gravity',
    category: 'relativity',
    question: 'Can quantum mechanics and general relativity be unified?',
    importance:
      'A theory of quantum gravity would reconcile our two most successful physical theories and reveal the behaviour of spacetime at the smallest scales.',
    currentIdeas:
      'Approaches include string theory, loop quantum gravity and causal sets; experimental guidance is limited.',
    assumptions: 'Assumes gravity has a quantum description or that spacetime emerges from more fundamental principles.',
    connections: ['gr_problem_time', 'it_holography', 'it_information_paradox']
  },
  {
    id: 'gr_problem_time',
    category: 'relativity',
    question: 'What is the nature of time in physics?',
    importance:
      'Reconciling the universal time of quantum mechanics with the dynamical spacetime of general relativity is essential for a unified theory.',
    currentIdeas:
      'Ideas include emergent time, timeless formulations and relational time; none are fully satisfactory.',
    assumptions: 'Assumes time is a physical entity that must be incorporated consistently in both quantum and gravitational theories.',
    connections: ['gr_quantum_gravity']
  },
  {
    id: 'cos_inflation',
    category: 'cosmology',
    question: 'Did cosmic inflation occur and what caused it?',
    importance:
      'Inflation explains why the universe is homogeneous and flat, but the details of this rapid expansion and the nature of the inflaton remain unknown.',
    currentIdeas:
      'Numerous inflationary models exist alongside alternatives like bouncing cosmologies or varying speed of light theories.',
    assumptions: 'Assumes the early universe underwent a phase of accelerated expansion driven by a scalar field or another mechanism.',
    connections: ['cos_dark_energy']
  },
  {
    id: 'cos_dark_matter',
    category: 'cosmology',
    question: 'What is dark matter?',
    importance:
      'Dark matter makes up a large fraction of the universe’s mass and governs the formation of galaxies, yet its identity remains unknown.',
    currentIdeas:
      'Candidates include weakly interacting massive particles (WIMPs), axions or modifications to gravity.',
    assumptions: 'Assumes that the observed gravitational effects require either new particles or a modified theory of gravity.',
    connections: ['pp_neutrino_mass', 'cos_dark_energy']
  },
  {
    id: 'cos_dark_energy',
    category: 'cosmology',
    question: 'What causes the accelerating expansion of the universe?',
    importance:
      'Understanding dark energy is crucial for determining the fate of the cosmos and may reveal new physics beyond the Standard Model.',
    currentIdeas:
      'Possibilities include a cosmological constant, dynamic fields like quintessence or modifications to general relativity.',
    assumptions: 'Assumes that the observed acceleration reflects a real energy component or a flaw in our cosmological model.',
    connections: ['cos_inflation', 'cos_dark_matter', 'gr_quantum_gravity']
  },
  {
    id: 'cos_baryogenesis',
    category: 'cosmology',
    question: 'Why is there more matter than antimatter?',
    importance:
      'The existence of matter requires an asymmetry between matter and antimatter; understanding it could reveal new physics.',
    currentIdeas:
      'Mechanisms include baryogenesis and leptogenesis involving CP violation in the early universe.',
    assumptions: 'Assumes that known CP violation is insufficient and that additional asymmetry-generating processes occurred.',
    connections: ['pp_hierarchy']
  },
  {
    id: 'pp_hierarchy',
    category: 'particle',
    question: 'Why is gravity so much weaker than the other forces?',
    importance:
      'The huge gap between the electroweak and Planck scales hints at new physics such as supersymmetry or extra dimensions.',
    currentIdeas:
      'Theories include supersymmetry, technicolor and large extra dimensions; no experimental evidence yet.',
    assumptions: 'Assumes the disparity is not a coincidence and signals deeper structure in particle physics.',
    connections: ['pp_neutrino_mass', 'pp_magnetic_monopoles']
  },
  {
    id: 'pp_magnetic_monopoles',
    category: 'particle',
    question: 'Do magnetic monopoles exist?',
    importance:
      'Magnetic monopoles would explain charge quantisation and appear in many grand unified theories, but none have been observed.',
    currentIdeas:
      'Searches continue in cosmic rays and particle accelerators; monopoles may be very heavy or confined.',
    assumptions: 'Assumes magnetic charge is a real possibility allowed by fundamental physics.',
    connections: ['pp_hierarchy']
  },
  {
    id: 'pp_neutrino_mass',
    category: 'particle',
    question: 'What is the nature of neutrino mass?',
    importance:
      'Determining the absolute mass scale and whether neutrinos are Majorana or Dirac particles impacts cosmology and particle physics.',
    currentIdeas:
      'Experiments like KATRIN and neutrinoless double beta decay searches are probing these properties.',
    assumptions: 'Assumes neutrino masses arise from a mechanism beyond the Standard Model.',
    connections: ['cos_dark_matter', 'cos_baryogenesis']
  },
  {
    id: 'it_information_paradox',
    category: 'information',
    question: 'Do black holes destroy information?',
    importance:
      'The black hole information paradox challenges the foundations of quantum mechanics and general relativity.',
    currentIdeas:
      'Proposals include information being preserved in Hawking radiation, remnant scenarios or the existence of firewalls.',
    assumptions: 'Assumes quantum mechanics is unitary and information cannot be lost.',
    connections: ['it_holography', 'gr_quantum_gravity']
  },
  {
    id: 'it_holography',
    category: 'information',
    question: 'Is spacetime holographic?',
    importance:
      'The holographic principle suggests our universe may have a lower-dimensional description and connects gravity to quantum information.',
    currentIdeas:
      'Examples like the AdS/CFT correspondence support holography; extending it to realistic spacetimes is an open challenge.',
    assumptions: 'Assumes quantum gravity can be encoded on a lower-dimensional boundary.',
    connections: ['it_information_paradox', 'gr_quantum_gravity']
  },
  {
    id: 'math_p_vs_np',
    category: 'math',
    question: 'Does P equal NP?',
    importance:
      'The P vs NP problem asks whether every problem whose solution can be quickly verified can also be quickly solved. Its resolution has profound implications for cryptography and algorithm design.',
    currentIdeas:
      'Most computer scientists believe P≠NP, but no proof exists. Some speculate that the question may even be independent of current axioms.',
    assumptions: 'Assumes our notions of computation and proof are well-defined and captured by Turing machines.',
    connections: ['qm_quantum_computer']
  },
  {
    id: 'math_riemann',
    category: 'math',
    question: 'Are all nontrivial zeros of the Riemann zeta function on the critical line?',
    importance:
      'The Riemann hypothesis has deep links to the distribution of prime numbers and is considered one of the most important open problems in mathematics.',
    currentIdeas:
      'Extensive numerical evidence supports the hypothesis, but a proof or counterexample remains elusive.',
    assumptions: 'Assumes a deeper connection between the zeros of the zeta function and prime number theory.',
    connections: []
  },
  {
    id: 'math_navier_stokes',
    category: 'math',
    question: 'Do smooth solutions to the Navier–Stokes equations always exist?',
    importance:
      'Understanding the existence and smoothness of solutions underpins our knowledge of fluid dynamics and turbulence.',
    currentIdeas:
      'Partial results exist in two dimensions; the three-dimensional case remains open.',
    assumptions: 'Assumes classical fluid mechanics accurately describes real fluids at all scales.',
    connections: []
  },
  {
    id: 'conc_hard_problem',
    category: 'consciousness',
    question: 'Why do organisms have subjective experiences?',
    importance:
      'The hard problem of consciousness seeks to explain how and why physical processes give rise to qualia and phenomenal experience.',
    currentIdeas:
      'Philosophical positions range from reductionist to dualist; scientific theories include integrated information theory and global workspace theory.',
    assumptions: 'Assumes consciousness has a physical basis but is not fully explained by functional or behavioural descriptions.',
    connections: []
  }
];

// Merge initial data with any stored user-added questions
function loadQuestions() {
  const stored = localStorage.getItem('userQuestions');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return [...initialQuestions, ...parsed];
    } catch (e) {
      console.error('Failed to parse stored questions', e);
    }
  }
  return [...initialQuestions];
}

let questions = loadQuestions();

// Build links from connection lists
function buildLinks(nodes) {
  const links = [];
  const ids = new Set(nodes.map((n) => n.id));
  nodes.forEach((n) => {
    (n.connections || []).forEach((target) => {
      if (ids.has(target)) {
        links.push({ source: n.id, target });
      }
    });
  });
  return links;
}

// Render category options in the form
function renderCategoryOptions() {
  const select = document.getElementById('category');
  select.innerHTML = '';
  Object.keys(categories).forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = categories[key].name;
    select.appendChild(option);
  });
}

// Render connection checkboxes based on current questions
function renderConnectionOptions(nodes) {
  const container = document.getElementById('connectionOptions');
  container.innerHTML = '';
  nodes.forEach((q) => {
    const label = document.createElement('label');
    label.classList.add('connection-label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = q.id;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + q.question));
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

// Draw the graph using D3
function drawGraph(nodes) {
  const links = buildLinks(nodes);

  const width = document.getElementById('graph').clientWidth;
  const height = document.getElementById('graph').clientHeight;

  // Clear any existing SVG
  d3.select('#graph').selectAll('*').remove();

  const svg = d3
    .select('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.id).distance(140)
    )
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append('g')
    .attr('stroke', '#aaa')
    .selectAll('line')
    .data(links)
    .enter()
    .append('line');

  const node = svg
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 8)
    .attr('fill', (d) => categories[d.category].color)
    .call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  // Tooltip for nodes
  node.append('title').text((d) => d.question);

  // Click handler to show details
  node.on('click', (event, d) => {
    displayDetails(d);
  });

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
  });
}

// Display details of a selected node
function displayDetails(node) {
  const container = document.getElementById('details');
  container.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = node.question;
  container.appendChild(title);

  const cat = document.createElement('p');
  cat.innerHTML = `<strong>Category:</strong> ${categories[node.category].name}`;
  container.appendChild(cat);

  const importance = document.createElement('p');
  importance.innerHTML = `<strong>Why is it important?</strong> ${node.importance}`;
  container.appendChild(importance);

  const ideas = document.createElement('p');
  ideas.innerHTML = `<strong>Current leading ideas:</strong> ${node.currentIdeas}`;
  container.appendChild(ideas);

  const assumptions = document.createElement('p');
  assumptions.innerHTML = `<strong>Assumptions:</strong> ${node.assumptions}`;
  container.appendChild(assumptions);

  if (node.connections && node.connections.length > 0) {
    const connections = document.createElement('p');
    const names = node.connections
      .map((id) => {
        const q = questions.find((x) => x.id === id);
        return q ? q.question : id;
      })
      .join(', ');
    connections.innerHTML = `<strong>Connected to:</strong> ${names}`;
    container.appendChild(connections);
  }
}

// Handle form submission for adding new questions
function setupForm() {
  const form = document.getElementById('addForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const qText = document.getElementById('question').value.trim();
    const importance = document.getElementById('importance').value.trim();
    const currentIdeas = document.getElementById('currentIdeas').value.trim();
    const assumptions = document.getElementById('assumptions').value.trim();
    const category = document.getElementById('category').value;
    const connectionCheckboxes = document.querySelectorAll(
      '#connectionOptions input[type="checkbox"]:checked'
    );
    const connections = Array.from(connectionCheckboxes).map((c) => c.value);

    if (!qText || !category) {
      alert('Please fill out the required fields.');
      return;
    }

    // Generate a unique id
    const id = `${category}_${Date.now()}`;

    const newQuestion = {
      id,
      category,
      question: qText,
      importance,
      currentIdeas,
      assumptions,
      connections
    };

    // Add to questions array and persist
    questions.push(newQuestion);
    const existingUser = localStorage.getItem('userQuestions');
    let stored = [];
    if (existingUser) {
      try {
        stored = JSON.parse(existingUser);
      } catch (e) {
        stored = [];
      }
    }
    stored.push(newQuestion);
    localStorage.setItem('userQuestions', JSON.stringify(stored));

    // Reset form and update connections list
    form.reset();
    renderConnectionOptions(questions);
    drawGraph(questions);
  });
}

// Initialise the page
function init() {
  renderCategoryOptions();
  renderConnectionOptions(questions);
  drawGraph(questions);
  setupForm();
}

// Wait for DOM content to load before initialising
document.addEventListener('DOMContentLoaded', init);