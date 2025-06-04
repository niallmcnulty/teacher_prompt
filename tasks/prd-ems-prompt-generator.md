# Product Requirements Document: EMS Prompt Generator MVP

## 1. Introduction/Overview
The EMS Prompt Generator is a web-based tool designed to help South African Senior Phase (Grades 7-9) EMS teachers create pedagogically sound prompts for their lessons. Teachers currently struggle to create effective prompts that align with CAPS curriculum requirements and incorporate sound pedagogical principles. This tool solves that problem by providing a structured interface that generates high-quality prompts teachers can use with AI tools like ChatGPT to create lesson materials.

**Problem Statement**: EMS teachers need pedagogically sound, CAPS-aligned prompts for AI tools but lack the time and expertise to craft them effectively.

**Solution**: A web-based prompt generator that combines curriculum knowledge, pedagogical principles, and local context into ready-to-use prompts.

## 2. Goals
- **Primary Goal**: Reduce prompt creation time for EMS teachers from 15+ minutes to under 2 minutes
- Create a simple, intuitive interface for generating EMS-specific prompts
- Ensure 100% of generated prompts align with CAPS curriculum requirements for Term 1
- Integrate basic pedagogical principles (Bloom's Taxonomy, scaffolding) into all prompts
- Provide seamless copy-paste workflow for use with OpenAI's ChatGPT
- Achieve 80%+ pedagogical quality score on generated prompts

## 3. User Stories

### 3.1 Core User Stories
**Story 1**: Grade and Topic Selection
- **As an** EMS teacher
- **I want to** select my grade (7, 8, or 9) and see only relevant Term 1 topics
- **So that** I can quickly find curriculum-aligned content
- **Acceptance Criteria**: 
  - Grade dropdown shows only 7, 8, 9
  - Topic dropdown updates based on selected grade
  - Only Term 1 topics are shown for MVP

**Story 2**: Learning Object Creation
- **As an** EMS teacher
- **I want to** select the type of learning material I need to create
- **So that** I get prompts appropriate for my teaching goal
- **Acceptance Criteria**:
  - Can select from: Lesson Plan, Quiz, Worksheet, Activity, PBL Task, Assessment Rubric
  - Prompt template changes based on selection
  - Each type includes specific pedagogical guidance

**Story 3**: Pedagogical Customization
- **As an** EMS teacher
- **I want to** adjust the complexity and scaffolding level
- **So that** I can meet my students' specific learning needs
- **Acceptance Criteria**:
  - Bloom's taxonomy dropdown with all 6 levels
  - Scaffolding dropdown with 3 clear levels
  - Generated prompt reflects selected pedagogical approach

**Story 4**: Prompt Preview and Copy
- **As an** EMS teacher
- **I want to** see a preview of my generated prompt and copy it easily
- **So that** I can review and use it with ChatGPT immediately
- **Acceptance Criteria**:
  - Real-time prompt preview updates as selections change
  - One-click copy to clipboard functionality
  - Success confirmation when copied

## 4. Functional Requirements

### 4.1 Input Interface
**Requirement 1**: Grade Selection
- Dropdown menu with options: Grade 7, Grade 8, Grade 9
- Default selection: Grade 8
- Required field (cannot be empty)

**Requirement 2**: Topic Selection
- Dropdown populated from CAPS Term 1 dataset
- Topics filtered by selected grade
- Includes at minimum:
  - **Grade 7**: The Economy, Needs and Wants, Circular Flow, Markets
  - **Grade 8**: Production, Forms of Ownership, Labour, Markets
  - **Grade 9**: Economic Systems, Business Planning, Financial Literacy, Entrepreneurship

**Requirement 3**: Learning Object Type Selection
- Dropdown with options:
  - Lesson Plan (45-minute structured lesson)
  - Quiz (10-15 questions with answer key)
  - Worksheet (activity-based learning sheet)
  - Activity (hands-on classroom activity)
  - PBL Task (problem-based learning project)
  - Assessment Rubric (evaluation criteria matrix)

**Requirement 4**: Bloom's Taxonomy Level
- Dropdown with options: Remember, Understand, Apply, Analyze, Evaluate, Create
- Default: Apply
- Tooltip explaining each level with EMS examples

**Requirement 5**: Scaffolding Level
- Dropdown with options:
  - High Support (detailed examples, step-by-step guidance)
  - Moderate Guidance (some examples, general framework)
  - Independent Application (minimal guidance, student-led)

**Requirement 6**: Special Instructions
- Text area (max 200 characters)
- Placeholder: "e.g., Include local South African examples, focus on township economy"
- Optional field

### 4.2 Prompt Generation Engine
**Requirement 7**: Base Template Structure
```
As an expert South African EMS teacher designing materials for Grade [X] students, create a [Learning Object Type] for the topic '[Topic]' in Term 1.

Learning Context:
- Learning objective: [Auto-generated based on CAPS curriculum]
- Target Bloom's level: [Selected Level]
- Scaffolding approach: [Selected Level with description]
- Duration: [Default time allocation based on object type]
- Class context: South African classroom, mixed ability

Pedagogical Framework:
Incorporate [specific pedagogical principles based on object type] and ensure the resource includes age-appropriate examples relevant to South African learners. Align with CAPS assessment standards for Grade [X] Term 1.

Assessment Integration:
Include [assessment type based on object type] that targets [relevant skills] and provides opportunities for formative feedback.

[Special Instructions if provided]

South African Context:
Ensure examples and scenarios reflect South African economic realities, including informal economy, local businesses, and cultural diversity.
```

**Requirement 8**: Dynamic Content Insertion
- System must replace all bracketed placeholders with selected values
- Auto-generate appropriate learning objectives from CAPS database
- Include context-appropriate assessment methods

**Requirement 9**: Copy to Clipboard
- One-click button to copy entire generated prompt
- Visual feedback (button changes to "Copied!" for 2 seconds)
- Must work across all major browsers

### 4.3 Quality Scoring System
**Requirement 10**: Pedagogical Assessment
- Automated check for:
  - CAPS curriculum alignment (2 points)
  - Appropriate Bloom's taxonomy integration (1 point)
  - Scaffolding approach consistency (1 point)
  - South African context inclusion (1 point)
- Display score as X/5 with color coding (Red: 1-2, Yellow: 3, Green: 4-5)

**Requirement 11**: Quality Feedback
- Brief explanation of score components
- Suggestions for improvement if score < 4
- CAPS compliance indicator (✓ or ✗)

### 4.4 User Interface Requirements
**Requirement 12**: Layout
- Single-page application with two-column layout
- Left column: Input controls (40% width)
- Right column: Prompt preview and output (60% width)
- Mobile responsive design

**Requirement 13**: Real-time Updates
- Prompt preview must update immediately when any selection changes
- No page refresh required
- Loading states for quality scoring (max 3 seconds)

**Requirement 14**: Error Handling
- Clear error messages for required fields
- Graceful fallback if OpenAI API is unavailable
- Input validation with helpful error text

## 5. Non-Goals (Out of Scope)
- User authentication and account management
- Saving generated prompts to database
- Offline functionality or PWA features
- Multiple language support (English only for MVP)
- Export to PDF, Word, or other formats
- Integration with LMS platforms
- Advanced analytics or usage tracking
- User feedback and rating system
- Cultural relevance beyond basic South African context
- Advanced AI optimization or machine learning

## 6. Technical Considerations

### 6.1 Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS for responsive design
- **State Management**: React useState for form state
- **Components**: Modular component structure
  - `InputPanel.tsx` - Left column with all form controls
  - `PromptPreview.tsx` - Right column with generated prompt
  - `QualityScore.tsx` - Quality scoring display component

### 6.2 Backend & API
- **Prompt Generation**: Client-side template processing (no backend required)
- **Quality Scoring**: OpenAI API integration for basic pedagogical assessment
- **Data Storage**: Static JSON files for CAPS curriculum data
- **API Structure**: Single endpoint `/api/quality-score` for prompt evaluation

### 6.3 Data Structure
**CAPS Dataset Format**:
```json
{
  "grade7": {
    "term1": {
      "topics": [
        {
          "name": "The Economy",
          "learningObjective": "Understand basic economic concepts and terminology",
          "concepts": ["needs", "wants", "goods", "services"],
          "duration": "3 weeks"
        }
      ]
    }
  }
}
```

### 6.4 Performance Requirements
- Initial page load: < 3 seconds
- Prompt generation: < 1 second (client-side)
- Quality scoring API call: < 5 seconds
- Mobile-responsive design for tablets and phones

## 7. Success Metrics
1. **Technical Metrics**:
   - Prompt generation time < 2 seconds
   - Quality score API response time < 5 seconds
   - Copy-to-clipboard success rate > 95%
   - Zero JavaScript errors in console

2. **User Experience Metrics**:
   - User completion rate (start to copy) > 90%
   - Average time from landing to copied prompt < 3 minutes
   - Quality score average > 4/5

3. **Functional Metrics**:
   - 100% CAPS curriculum coverage for included topics
   - All 6 Bloom's taxonomy levels properly integrated
   - Error handling coverage for all user input scenarios

## 8. Open Questions
1. **Technical**: Should we cache OpenAI API responses for identical prompts to reduce costs?
2. **Content**: What is the minimum number of topics per grade needed for a viable MVP?
3. **UX**: Should quality scoring be automatic or triggered by user action?
4. **Performance**: Do we need loading states for the prompt generation, or is it fast enough?
5. **Validation**: What specific CAPS curriculum standards should we reference in the quality check?

## 9. Implementation Phases

### Phase 1 (MVP - Week 1-2)
**Week 1**:
- Set up Next.js project with TailwindCSS
- Create basic UI layout with input controls
- Implement static dropdown populations
- Build prompt template system

**Week 2**:
- Add CAPS dataset integration
- Implement real-time prompt generation
- Add copy-to-clipboard functionality
- Basic error handling and validation

### Phase 1.5 (Quality Enhancement - Week 3)
- OpenAI API integration for quality scoring
- Quality feedback system
- UI polish and mobile responsiveness
- Testing and bug fixes

### Future Phases (Post-MVP)
**Phase 2**: Enhanced user experience
- Advanced prompt customization options
- Prompt history (local storage)
- Export functionality
- User feedback collection

**Phase 3**: Advanced features
- Multi-term curriculum support
- Advanced AI optimization
- Integration capabilities
- Analytics and insights

## 10. Design Considerations
- **Color Scheme**: Professional education-focused palette with South African flag accent colors
- **Typography**: Clear, readable fonts suitable for teachers
- **Accessibility**: Proper contrast ratios, keyboard navigation support
- **Icons**: Intuitive icons for copy, quality score, and dropdown controls
- **Spacing**: Generous whitespace for easy scanning and reading 