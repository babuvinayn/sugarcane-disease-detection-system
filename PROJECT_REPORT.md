# PROJECT REPORT

## Sugarcane Disease Detection System
### An AI-Powered Agricultural Solution Using YOLOv8

**Submitted in partial fulfillment of the requirements for the award of the degree of**
**Bachelor of Technology in Computer Science and Engineering**

---

**Submitted by:**

| Name | Register Number |
|---|---|
| BabuVinay N | [Register Number] |
| Ram Chaithanya | [Register Number] |
| Hithesh Reddy P | [Register Number] |

**Under the guidance of:**
[Guide Name], [Designation]
Department of Computer Science and Engineering
Presidency University, Bengaluru

**Academic Year: 2025–2026**

---

---

# DETAILED REPORT OUTLINE

> **Estimated total pages: 50+**
> All chapters below include section-by-section descriptions, figures, tables,
> and code references that will be expanded in full during generation.

---

## FRONT MATTER

| Section | Estimated Pages |
|---|---|
| Title Page | 1 |
| Bonafide Certificate | 1 |
| Declaration | 1 |
| Acknowledgement | 1 |
| Abstract | 1 |
| List of Figures | 1 |
| List of Tables | 1 |
| Table of Contents | 1 |

---

## CHAPTER 1 — Introduction *(pages 1–8)*

| Section | Title |
|---|---|
| 1.1 | Background and Context |
| 1.2 | Problem Statement |
| 1.3 | Motivation |
| 1.4 | Existing Approaches and Their Limitations |
| 1.5 | Proposed Solution |
| 1.6 | Objectives |
| 1.7 | Scope of the Project |
| 1.8 | Alignment with Sustainable Development Goals |
| 1.9 | Organisation of the Report |

---

## CHAPTER 2 — Literature Review *(pages 9–18)*

| Section | Title |
|---|---|
| 2.1 | Overview |
| 2.2 | Machine Learning Approaches for Plant Disease Detection |
| 2.3 | Deep Learning for Agricultural Image Classification |
| 2.4 | YOLO Series Evolution and Agricultural Applications |
| 2.5 | Instance Segmentation vs. Object Detection in Plant Pathology |
| 2.6 | Web-Based Agricultural Decision Support Systems |
| 2.7 | User Authentication in Agricultural Software |
| 2.8 | Summary and Research Gap |

---

## CHAPTER 3 — System Analysis and Design *(pages 19–28)*

| Section | Title |
|---|---|
| 3.1 | System Requirements Analysis |
| 3.1.1 | Functional Requirements |
| 3.1.2 | Non-Functional Requirements |
| 3.2 | Technology Stack |
| 3.3 | System Architecture |
| 3.4 | Data Flow Diagram |
| 3.5 | Use Case Diagram and Scenarios |
| 3.6 | Database Design |
| 3.6.1 | Entity-Relationship Diagram |
| 3.6.2 | Table Schemas |
| 3.7 | API Design |
| 3.8 | Security Design |
| 3.9 | UI/UX Design Principles |

---

## CHAPTER 4 — Implementation *(pages 29–38)*

| Section | Title |
|---|---|
| 4.1 | Development Environment and Tools |
| 4.2 | Dataset Preparation and Annotation |
| 4.3 | Model Training |
| 4.3.1 | Transfer Learning Strategy |
| 4.3.2 | Data Augmentation |
| 4.3.3 | Training Hyperparameters |
| 4.4 | Backend Implementation |
| 4.4.1 | FastAPI Application Structure |
| 4.4.2 | Authentication Module |
| 4.4.3 | Inference Pipeline |
| 4.4.4 | PDF Report Generation |
| 4.5 | Frontend Implementation |
| 4.5.1 | Template Architecture |
| 4.5.2 | JavaScript Client Logic |
| 4.5.3 | Progressive Web App Features |
| 4.6 | Docker Deployment |

---

## CHAPTER 5 — Testing and Results *(pages 39–46)*

| Section | Title |
|---|---|
| 5.1 | Testing Strategy |
| 5.2 | Model Performance Metrics |
| 5.2.1 | Precision, Recall, F1-Score |
| 5.2.2 | mAP@50 and mAP@50–95 |
| 5.2.3 | Confusion Matrix |
| 5.3 | System-Level Testing |
| 5.3.1 | API Endpoint Testing |
| 5.3.2 | Authentication Testing |
| 5.3.3 | Load and Performance Testing |
| 5.4 | Results and Discussion |
| 5.5 | Comparative Analysis |

---

## CHAPTER 6 — Conclusion and Future Work *(pages 47–50)*

| Section | Title |
|---|---|
| 6.1 | Summary of Work |
| 6.2 | Contributions |
| 6.3 | Limitations |
| 6.4 | Future Enhancements |
| 6.5 | Closing Remarks |

---

## BACK MATTER

| Section | Estimated Pages |
|---|---|
| References | 2 |
| Appendix A — Dataset Statistics | 1 |
| Appendix B — API Reference | 1 |

---
---

# CHAPTER 1 — INTRODUCTION

---

## 1.1 Background and Context

Agriculture is the backbone of the Indian economy, employing more than 54 percent of the country's workforce and contributing approximately 17 to 18 percent of the national GDP as of 2024. Within the broad agricultural landscape, sugarcane (*Saccharum officinarum* L.) occupies an especially critical position. India is the world's second-largest producer of sugarcane, cultivating the crop across approximately 5.5 million hectares and producing more than 340 million metric tonnes annually. The states of Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, and Andhra Pradesh together account for the majority of domestic output. Sugarcane is not merely a cash crop; it is the raw material for the sugar industry, which supports more than 50 million farmers and an estimated 500,000 workers employed directly within sugar mills across the country. Beyond sugar, the crop feeds ethanol production for biofuel blending mandates, provides bagasse for power co-generation, and supplies molasses to the distillery sector—making it an anchor commodity across multiple industrial value chains.

Despite its economic centrality, sugarcane cultivation is persistently threatened by a wide array of biotic stresses. Plant pathogens including fungi, bacteria, phytoplasmas, and viruses cause diseases that reduce both the tonnage and the sugar recovery percentage of harvested cane. Among the most economically damaging diseases are red rot (caused by *Colletotrichum falcatum*), smut (caused by *Sporisorium scitamineum*), wilt (associated with *Fusarium* species), pokkah boeng (caused by *Fusarium moniliforme*), grassy shoot disease (a phytoplasma disorder), and ratoon stunting disease (caused by *Leifsonia xyli* subsp. *xyli*). In parallel, insect pests—including the sugarcane pyrilla (*Pyrilla perpusilla*), the early shoot borer (*Chilo infuscatellus*), the top borer (*Scirpophaga excerptalis*), the woolly aphid (*Ceratovacuna lanigera*), and whiteflies—inflict direct mechanical damage to stalks and leaves, while also serving as vectors for secondary disease transmission.

The cumulative yield loss attributable to diseases and insect pests is estimated at 15 to 40 percent of potential production in severe outbreak years, translating into billions of rupees of economic damage annually. Effective management of these biotic stresses requires timely and accurate identification of the causative agent, so that the appropriate chemical, biological, or cultural control measure can be applied before infestation or infection spreads through a field. Early detection is therefore not merely an agronomic nicety; it is a prerequisite for economically viable and environmentally sustainable crop management.

Historically, disease diagnosis in sugarcane has depended on the direct visual assessment of field symptoms by trained agronomists or plant pathologists. This expert-dependent approach suffers from several practical limitations. Qualified agronomists are scarce relative to the scale of cultivation, particularly in remote or smallholder farming areas. Field visits are time-consuming and costly, and the frequency of expert inspection that a large farm can sustain is typically far lower than the monitoring density that effective disease surveillance would require. Moreover, even experienced practitioners can disagree on the diagnosis of early-stage infections, where visible symptoms are subtle or overlap with those of multiple conditions. The window between the first appearance of detectable symptoms and the point at which disease pressure becomes agronomically significant is often a matter of days—a timeframe that manual inspection protocols are ill-equipped to exploit.

These limitations have stimulated sustained scientific interest in developing automated, non-destructive methods for plant disease detection. The convergence of advances in digital imaging, high-performance computing, and machine learning over the past decade has made it technically feasible to train computational models that can recognise disease symptoms in plant photographs with accuracy comparable to or exceeding that of human experts. This project is situated squarely within that movement, applying state-of-the-art object detection and instance segmentation technology to the specific challenge of sugarcane disease and pest identification.

---

## 1.2 Problem Statement

In Indian sugarcane cultivation, the timely detection of foliar diseases and insect pest damage is a critical factor in preventing large-scale yield loss. The current dominant diagnostic method—manual inspection by agronomists—is limited in scale, speed, consistency, and geographical reach. Farmers in remote or resource-constrained settings often cannot access expert diagnosis rapidly enough to mount an effective early response to emerging disease or pest pressure. The consequence is that treatments are applied either too late to prevent spread, or incorrectly based on misdiagnosis, leading to unnecessary chemical input costs and avoidable yield losses.

Existing automated disease detection systems in the broader plant pathology literature have demonstrated strong performance in controlled laboratory conditions but frequently fail to generalise to the diverse field conditions encountered in real agricultural environments. Variations in ambient lighting, camera quality, image angle, leaf occlusion, growth stage, and concurrent disease infections make the classification problem substantially harder when moving from curated benchmark datasets to actual farm imagery. Additionally, the predominant classification-only approach adopted by many prior systems—which assigns a single disease label to an entire image—is of limited practical utility; farmers and agronomists need to know not just *what* disease is present, but *where* in the image it is located, how extensive the affected area is, and how severely it has progressed.

Furthermore, available systems rarely integrate end-to-end into a user-accessible application. A system that runs only as a local Python script, requires manual configuration of file paths, or demands expert knowledge to operate is not practically deployable to smallholder farmers or field extension workers. There is a clear gap between research-grade disease detection models and production-ready, user-friendly agricultural decision support tools.

This project addresses all three dimensions of the problem: it provides a **localised**, **segmentation-based** disease and pest detection capability (answering *what* and *where*), it delivers this through a **web-accessible interface** that requires no specialised software installation (addressing accessibility), and it integrates **severity scoring** and **treatment recommendations** within the same user session (enabling actionable decision support).

---

## 1.3 Motivation

The motivation for this project emerges from the intersection of two converging trends: the maturation of real-time deep learning inference technology to a level of accessibility and performance that makes field deployment genuinely practical, and the heightened urgency around agricultural productivity in the context of climate change and food security.

The YOLOv8 architecture, released by Ultralytics in January 2023, represents a significant advancement in the state of the art for real-time object detection and instance segmentation. Its nano-scale variant (YOLOv8n) achieves inference times of under 80 milliseconds on CPU hardware while maintaining competitive accuracy, making it deployable on standard web-server infrastructure without requiring dedicated GPU compute. This cost and accessibility profile is qualitatively different from earlier large-scale deep learning models and creates a genuine pathway to affordable deployment at the scale of individual farms or regional agricultural extension services.

Simultaneously, the proliferation of affordable smartphones with capable cameras among rural farming communities in India means that the image acquisition infrastructure for an AI-based disease detection system already exists in the field. A web-based application accessible via a mobile browser can reach farmers who would never have access to a dedicated hardware terminal or a locally installed desktop application.

From a software engineering perspective, the availability of mature Python ecosystem libraries—FastAPI for high-performance asynchronous API development, SQLAlchemy for database persistence, Passlib and python-jose for authentication, ReportLab for document generation, and Ultralytics for model serving—means that a full-featured, production-ready application can be built and deployed within a realistic project timeframe by a small team. The project thus sits at a technically opportune moment where the tools, the data, and the real-world need are simultaneously aligned.

The team members were additionally motivated by personal awareness of the challenges faced by farmers in Karnataka, one of India's major sugarcane-producing states and the location of Presidency University. The prospect of building a system with genuine potential to contribute to the income security of smallholder farmers in the region provided strong practical motivation throughout the development process.

---

## 1.4 Existing Approaches and Their Limitations

A substantial body of research has explored the application of machine learning and deep learning methods to plant disease detection. Understanding the limitations of prior approaches is essential to situating the contribution of the present system.

**4.1 Traditional Machine Learning Approaches**

Early automated plant disease detection systems relied on handcrafted feature extraction followed by conventional classifiers such as Support Vector Machines (SVM), k-Nearest Neighbours (kNN), or Random Forests. These pipelines typically extracted colour histogram features, Gabor texture descriptors, or Local Binary Pattern (LBP) representations from segmented leaf regions and fed them into discriminative classifiers. While these approaches achieved reasonable performance on small, controlled datasets—often exceeding 90 percent classification accuracy in benchmark studies—they exhibit poor generalisation to real-world variability. Handcrafted features cannot fully capture the complex, multi-scale morphological patterns that distinguish one pathogen's symptom from another, particularly when images are acquired under heterogeneous lighting conditions or at varying distances and angles.

**4.2 Convolutional Neural Network Classification Systems**

The introduction of deep Convolutional Neural Networks (CNNs) substantially improved baseline performance on plant disease detection benchmarks. Seminal work by Mohanty *et al.* (2016), using the PlantVillage dataset of over 54,000 laboratory-quality images, demonstrated that a fine-tuned AlexNet model could achieve over 99 percent accuracy in classifying 26 diseases across 14 crop species under controlled conditions. Subsequent work applied VGG-16, ResNet, DenseNet, Inception, and EfficientNet architectures to various crop disease datasets, consistently demonstrating strong classification performance on benchmark test sets.

However, the practical limitation of CNN-based classification approaches is that they predict a single class label for an entire input image. This image-level classification paradigm is inadequate when a leaf or plant section contains multiple co-occurring conditions—a situation common in heavily affected fields—and it provides no information about the spatial extent or localisation of disease symptoms. It cannot answer the question "how much of this plant is affected?", which is essential for severity assessment and for deciding the appropriate intensity of treatment response.

**4.3 Earlier YOLO Variants for Agricultural Detection**

Object detection approaches using earlier YOLO versions (v3, v4, v5) have been applied to plant disease detection, offering bounding-box localisation alongside class prediction. These represent a meaningful improvement over whole-image classification by indicating *where* in an image the detector has identified a diseased region. However, bounding-box-level detection overestimates affected area (a bounding box encompasses both diseased tissue and adjacent healthy tissue within the rectangular region) and therefore provides only a coarse proxy for actual disease severity.

**4.4 Limitations of Prior Systems in Deployment**

Perhaps the most significant practical limitation of published disease detection research is the gap between research prototypes and deployable systems. The majority of published studies evaluate models on curated laboratory datasets, do not provide end-to-end deployment infrastructure, and require expert knowledge to operate. Systems that are demonstrated only as Python scripts with hardcoded local file paths—a scenario exemplified by the initial state of this project's own `data/dataset.yaml` containing an absolute Windows path—are not accessible to farmers or extension workers without significant technical mediation. The absence of user authentication, scan history, PDF reporting, and batch processing features means that most prior systems function only as proof-of-concept demonstrations rather than operational tools.

**4.5 Specific Gap for Sugarcane**

For sugarcane specifically, the availability of annotated datasets and pre-trained models is considerably more limited than for extensively studied crops such as maize, wheat, tomato, or rice. Most large-scale benchmark datasets (PlantVillage, PlantDoc, iPlant Challenge) cover few or no sugarcane conditions. This scarcity of available pre-trained models motivated the training of custom YOLOv8 models on a domain-specific annotated sugarcane dataset in this project.

---

## 1.5 Proposed Solution

This project proposes, implements, and evaluates a complete, end-to-end **Sugarcane Disease Detection System**—an AI-powered web application that enables any user with a browser and a photograph of a sugarcane plant to obtain immediate, localised disease and pest detection results along with actionable treatment recommendations.

The technical core of the system is a dual-model inference pipeline based on the YOLOv8 architecture. The **detection model** (`yolov8.pt`, 22.5 MB) performs bounding-box localisation of healthy, diseased, and insect-damaged regions, providing rapid screening capability with an average inference time of approximately 50 milliseconds per image on CPU hardware. The **segmentation model** (`yolov8_seg.pt`, 67.9 MB) extends this with pixel-level instance segmentation masks, enabling precise computation of the proportion of leaf or stalk area that is affected—the basis for the system's health index and severity classification.

Both models recognise three classes of condition: **healthy** tissue (class 0), **disease-affected** regions (class 1), and **insect pest** damage or presence (class 2). The models were trained using transfer learning from the official Ultralytics YOLOv8n and YOLOv8n-seg pretrained weights, fine-tuned on a custom annotated sugarcane dataset organised in YOLO format. Training was performed for 100 epochs with image size 640×640, batch size 16, and a comprehensive suite of data augmentation operations including HSV colour jitter, horizontal flipping, mosaic composition, and scale variation.

The models are served through a **FastAPI** backend application that provides a RESTful API supporting single-image analysis, batch processing of multiple images, and lightweight real-time frame analysis for webcam-based field inspection. The API is documented and accessible, with all endpoints returning structured JSON responses.

User management is handled through a complete **authentication system** based on JWT (JSON Web Token) bearer tokens with a 24-hour expiry window. Passwords are stored as `pbkdf2_sha256` hashes using Passlib, and all protected endpoints enforce token validation middleware. User accounts are stored in an SQLite database managed through **SQLAlchemy** ORM models.

The web interface—served as Jinja2 HTML templates with accompanying CSS and JavaScript—provides a fully responsive, mobile-friendly user experience featuring drag-and-drop image upload, an adjustable confidence threshold slider, side-by-side display of the original and annotated image alongside a spatial confidence heatmap, scan history retrieval, and downloadable PDF reports generated via ReportLab. A Progressive Web App (PWA) manifest and service worker are included, enabling installation on mobile devices with offline caching for the shell UI.

The entire application is containerised using Docker, enabling consistent deployment across development, staging, and production environments. A `docker-compose`-compatible `Dockerfile` is provided based on the `python:3.10-slim` image with the necessary OpenCV system dependencies pre-installed.

---

## 1.6 Objectives

The project was undertaken with the following specific and measurable objectives:

**Objective 1 — Model Development:**
To train and validate YOLOv8-based detection and segmentation models capable of identifying healthy, disease-affected, and insect-damaged regions in sugarcane imagery with a mean Average Precision (mAP@50) of at least 0.75 on the held-out validation set.

**Objective 2 — Inference System:**
To develop a robust Python-based inference pipeline that loads trained YOLOv8 models, processes uploaded images, computes bounding boxes (detection mode) or pixel-level segmentation masks (segmentation mode), and returns structured results including class labels, confidence scores, health index, severity classification, and annotated image output.

**Objective 3 — Backend API:**
To implement a production-quality RESTful API using FastAPI that exposes endpoints for image analysis (single, batch, and live-frame), user registration and authentication, scan history retrieval, dashboard statistics, and PDF report download—with appropriate input validation, error handling, and logging.

**Objective 4 — Authentication and Data Persistence:**
To implement a secure user authentication system using JWT tokens and password hashing, with per-user scan history stored persistently in a relational database via SQLAlchemy, ensuring that individual users can track their detection history across sessions.

**Objective 5 — Web Interface:**
To develop a responsive, mobile-friendly web interface that allows non-technical users to interact with the detection system without any knowledge of the underlying AI or API infrastructure, providing a complete user journey from image upload through result interpretation to report download.

**Objective 6 — Deployment:**
To package the complete application in a Docker container that can be deployed consistently across operating systems and cloud environments, and to validate deployment on a publicly accessible hosting platform (Hugging Face Spaces with Docker SDK).

**Objective 7 — Treatment Knowledge Base:**
To integrate a structured knowledge base of disease-specific chemical and cultural treatment recommendations, surfaced to the user when detection confidence meets or exceeds a 75 percent threshold, supporting evidence-based crop management decisions.

---

## 1.7 Scope of the Project

The scope of this project encompasses the complete software engineering and machine learning lifecycle for a web-accessible sugarcane disease detection application, from dataset preparation and model training through backend and frontend development to containerised deployment and evaluation.

**In scope:**
- Design and training of YOLOv8 detection and segmentation models for three-class sugarcane condition recognition (healthy, disease, insect).
- Development of a FastAPI-based backend server providing RESTful APIs for detection, authentication, history, statistics, and reporting.
- Development of a browser-accessible frontend with drag-and-drop upload, live webcam analysis, scan history, and PDF export.
- User registration, login, and JWT-based session management.
- SQLite-based persistent storage of user profiles and scan records.
- Docker containerisation for portable deployment.
- Performance evaluation of trained models and system-level testing.

**Out of scope:**
- Species-level identification of specific pathogens (e.g., distinguishing red rot from smut at the molecular level). The system classifies conditions into broad categories (disease, insect, healthy) rather than making species-specific diagnoses.
- Integration with external sensor systems (e.g., drone-mounted multispectral cameras, soil sensors).
- Support for languages other than English in the user interface (a static `i18n.json` file is included in the codebase but multi-language rendering is not fully implemented in this version).
- Native mobile application development (iOS/Android); the PWA functionality provides installability without requiring a separate native application.
- Remote agronomy consultation or telemedicine features.
- Commercial scale deployment, SLA guarantees, or multi-tenancy infrastructure.

---

## 1.8 Alignment with Sustainable Development Goals

This project contributes to three of the United Nations Sustainable Development Goals (SDGs):

**SDG 2 — Zero Hunger:** By enabling early and accurate detection of sugarcane diseases and pests, the system supports higher crop yields and reduced post-harvest losses, directly contributing to food security and the livelihoods of farming communities dependent on sugarcane production.

**SDG 9 — Industry, Innovation and Infrastructure:** The project demonstrates the application of state-of-the-art AI infrastructure to an agricultural challenge, illustrating how technological innovation can be translated into accessible tools for sectors traditionally characterised by limited technology adoption. The open-source, Docker-containerised packaging supports further innovation and adoption by other developers and institutions.

**SDG 12 — Responsible Consumption and Production:** By enabling targeted chemical treatment decisions based on accurate disease identification and severity assessment—and by gating treatment recommendations behind a 75 percent confidence threshold—the system supports reduction of unnecessary pesticide use, contributing to more sustainable agricultural input management.

---

## 1.9 Organisation of the Report

The remainder of this report is structured as follows:

**Chapter 2 — Literature Review** surveys the academic and technical literature relevant to plant disease detection using machine learning, with particular attention to YOLO-based detection and segmentation systems and their application to agricultural problems. It identifies the research gap that this project addresses.

**Chapter 3 — System Analysis and Design** documents the requirements specification for the system, presents the overall architecture, data flow diagrams, use case analysis, database design, API design, and security design decisions.

**Chapter 4 — Implementation** describes the development environment, dataset preparation and annotation process, model training procedure and hyperparameters, backend API implementation, frontend interface development, and Docker deployment configuration.

**Chapter 5 — Testing and Results** presents the evaluation methodology, model performance metrics (precision, recall, F1, mAP@50, mAP@50–95), system-level test results, load testing outcomes, and a comparative analysis of the developed system against prior work.

**Chapter 6 — Conclusion and Future Work** summarises the key contributions of the project, acknowledges its current limitations, and outlines a roadmap of future enhancements including species-level disease classification, mobile application development, integration with drone imagery, and federated model improvement through crowdsourced field data.

---

*End of Chapter 1*

---

> **Note:** Chapters 2 through 6, References, and Appendices will be added in subsequent generation steps.
