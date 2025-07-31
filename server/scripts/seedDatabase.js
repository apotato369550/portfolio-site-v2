import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import DataCampCoursesModel from '../models/DataCampCourses.js';
import DataCampProjectsModel from '../models/DataCampProjects.js';
import GithubCommitsModel from '../models/GitHubCommits';
import ProjectModel from '../models/GitHubProjects.js';
import LeetCodeSubmissionsModel from '../models/LeetCodeSubmissions';

// continue here, then runit >:))