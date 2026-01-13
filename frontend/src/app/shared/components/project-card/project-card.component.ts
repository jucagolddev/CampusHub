import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  image: string;
  technologies: string[];
  title: string;
  description: string;
  author: string;
  githubLink: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
