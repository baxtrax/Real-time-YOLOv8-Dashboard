# Realtime YOLOv8 Dashboard

[![Python][Python-badge]][Python-url]
[![Pytorch][Pytorch-badge]][Pytorch-url]
[![React][React-badge]][React-url]
[![Nextjs][Nextjs-badge]][Nextjs-url]

A Realtime YOLOv8 Dashboard, was done as a small senior project to dive more into React using Next.js and real-time communication protocols. Allows the use of YOLOv8 (and technically later models like YOLOv9) lightweight object detection models in real-time including real-time Segmentation, Pose-Estimation, Heatmaps, and other configurable settings. Program was built to be as efficient as possible and as fast as possible, achieving inference and display speeds near what were benchmarked by the [YOLOv8 creators](https://www.ultralytics.com/), while showing off more features and a dynamic, responsive UI.

Since this was done as a project, there are also project documents available, such as requirements, test deliverables, and design documents about the entirety of the program.

[Software Design Document (SDD)](docs/Requirements.pdf)

[Requirements Document](docs/Software_Design_Document.pdf)


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-code-and-folders">About The Code and Folders</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#backend-launch">Backend Launch</a></li>
        <li><a href="#frontend-launch">Frontend Launch</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- Improved compatibility of back-to-top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- ABOUT THE CODE-->
## About The Code and Folders

The program uses a Server-Client Architecture (Alothough closer to MVC). The backend (Python, Flask, Pytorch, Swagger-ui) and the frontend (React, Next.js, MUI) have their own folders which contain each project.

A breakdown of the important [frontend](frontend) code folders is below. Frontend UI is available at [http://127.0.0.1:5001](http://127.0.0.1:5001).
* [frontend/src/components/input](frontend/src/components/input)
  * Holds all base input custom components used to create the UI; most components extend off the [base.tsx](frontend/src/components/input/base.tsx) component.
* [frontend/src/components/output](frontend/src/components/output)
  * Holds all components used for output. Many of these are fully custom due to the real-time nature of the outputs and styling to make them fit the theme.
* [frontend/src/components/panel](frontend/src/components/panel)
  * Holds the panels that create the full UI on the frontend. This allows for easy responsive UI via flex-box grid.
* [frontend/src/contexts](frontend/src/contexts)
  * Holds the context providers which orchestrate the overall dynamic logic of the program

A breakdown of the important [backend](backend) code folders is below. Backend Swagger UI is available at [http://127.0.0.1:5001](http://127.0.0.1:5001).
* [backend/apis](backend/apis)
  * Holds all of the API namespaces hosted by Flask and displayed on the Swagger UI
* [backend/core](backend/core)
  * Holds all core functionality logic such as prediction, as well as utilities and other streaming-related logic.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites

You will need to have some sort of python. You will also need nodejs and react.

(Optional)
* Setup a python environment (conda or pyenv) to keep your development space tidy.
* A GPU. This will make generation much, much, quicker

### Installation

1. Clone the repo
   ```bash
   git clone git@github.com:baxtrax/Realtime-YOLOv8-Dashboard.git
   ```
2. Install the required libraries
   ```bash
   cd frontend && pip install -r requirements.txt && cd ../backend && npm install
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
### Backend Launch
1. Open a console and run the [backend/app.py](backend/app.py) python file to launch the backend.
   ```bash
   cd backend && python app.py
   ```
2. (Optional) Open the backend swagger UI and test keepalive. Swagger UI is hosted at [http://127.0.0.1:5001](http://127.0.0.1:5001)

## Frontend Launch
1. Open a console and run the React project
   ```bash
   cd frontend && npm run dev
   ```
2. Open the frontend webpage. Its hosted at [http://127.0.0.1:5001](http://127.0.0.1:5001)
3. Select a Model source. Thats it!
4. (Optional) Play around with all the settings, all can be changed in real-time with no delay, even swapping model sizes!
> The website should try to match your system preferences for dark or light mode. If not, you can specify dark mode and light mode by clicking the sun icon above the Webcam panel.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Python-badge]: https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=python&logoColor=FFD343
[Python-url]: https://www.python.org/
[Pytorch-badge]: https://img.shields.io/badge/Pytorch-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white
[Pytorch-url]: https://pytorch.org/
[React-badge]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[React-url]: https://react.dev/
[Nextjs-badge]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nextjs-url]: https://nextjs.org/
