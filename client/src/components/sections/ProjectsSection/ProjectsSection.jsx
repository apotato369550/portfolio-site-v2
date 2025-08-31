import React from 'react'

// import assets from assets/ProjectsSection

const ProjectsSection = () => {
  return (
    <div id="projects-section">
        <div className="projects-title"><span className="question-emphasis">What</span> have I been working on?</div>
        <div className="projects">
            <div className='projects-subtitle'><h2>My Projects</h2></div>
            {/* insert projects section here from /server api */}
        </div>
        <div className="projects">
            <div className='projects-subtitle'><h2>My Recent Commits</h2></div>
            <div className="commit-calendar">
            {/* insert commit calendar section here /server api */}
            </div>
            <div className="commit-history">

            {/* insert recent commits section here /server api */}
            </div>
        </div>
    </div>
  )
}

export default ProjectsSection