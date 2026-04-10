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

> **Note:** Chapters 3 through 6, References, and Appendices will be added in subsequent generation steps.

---
---

# CHAPTER 2 — LITERATURE REVIEW

---

## 2.1 Overview

The automated detection and classification of plant diseases from digital images is one of the most actively studied application domains within agricultural informatics and computer vision. Over the past two decades, the field has undergone a profound methodological transition—from rule-based image processing and handcrafted feature extraction, through shallow machine learning classifiers, to the contemporary paradigm of end-to-end deep neural networks trained on large annotated datasets. This chapter reviews the principal threads of this evolution as they are relevant to the design decisions made in the present project, with specific attention to: the progression of machine learning and deep learning techniques applied to plant disease detection; the development of the YOLO family of real-time object detection architectures; the emerging use of instance segmentation for plant pathology; the design of web-based agricultural decision support platforms; and the role of secure user authentication in agricultural software systems.

The literature reviewed spans peer-reviewed journal articles, conference proceedings, benchmark dataset publications, and technical reports from model development organisations. Where specific metrics (accuracy, mAP, inference time) are cited, they are drawn from the original publication or the official Ultralytics documentation and benchmarks. The chapter concludes with a structured summary of the research gap that this project is designed to address.

---

## 2.2 Machine Learning Approaches for Plant Disease Detection

The systematic study of automated plant disease recognition from digital photographs began in earnest in the early 2000s with methods rooted in classical image processing and shallow machine learning.

**Colour-Based Segmentation and Threshold Methods**

The earliest computational approaches exploited the fact that many plant diseases produce characteristic colour changes in infected tissue—yellowing (chlorosis), browning (necrosis), or dark discolouration (melanisation)—that differ measurably from the green pigmentation of healthy tissue. Researchers applied colour space transformations (RGB to HSV, Lab, or YCbCr) followed by threshold-based segmentation to isolate candidate lesion regions. Al-Hiary *et al.* (2011) demonstrated a pipeline that converted leaf images to the HSV colour space, applied thresholding to extract yellow and brown regions, and achieved 94 percent classification accuracy on a small dataset of four disease classes under controlled white-light conditions. Phadikar *et al.* (2008) applied Fuzzy C-means clustering in the CIE Lab colour space to segment diseased regions in paddy leaves, reporting accurate lesion extraction at the cost of a computationally intensive algorithm unsuited to real-time field deployment.

The limitation of purely colour-based methods became apparent when systems were evaluated under field conditions: natural illumination introduces dramatic variation in leaf colour appearance that renders fixed colour thresholds unreliable. A green leaf photographed in direct equatorial sunlight differs measurably in its RGB values from the same leaf photographed in diffuse shade, and a threshold calibrated for one condition will misclassify under the other.

**Texture Feature Extraction with Classical Classifiers**

The next generation of approaches supplemented or replaced colour features with texture descriptors intended to capture the morphological patterns of lesions—their surface roughness, granularity, and structural regularity—independent of absolute colour values. Sannakki *et al.* (2011) extracted Grey-Level Co-occurrence Matrix (GLCM) features from segmented lesion regions and trained an SVM classifier to distinguish four grape leaf diseases, achieving 85 percent accuracy. Rothe and Kshirsagar (2015) combined Local Binary Pattern (LBP) histograms with colour moment features and evaluated k-Nearest Neighbour, Decision Tree, and Naive Bayes classifiers on a pomegranate disease dataset. The SVM consistently outperformed alternative classifiers in precision, but the overall best accuracy of 88 percent was achieved only on the controlled portion of the test set.

The fundamental ceiling on performance imposed by handcrafted feature pipelines became clear from cross-dataset evaluation: a feature extractor and classifier pair trained and tuned on images from one laboratory setting generalised poorly to images from a different acquisition environment, lighting configuration, or camera model. The features themselves were not learned from data and therefore could not adapt to the variability of real-world plant imagery.

**Random Forests and Ensemble Methods**

Ensemble methods, particularly Random Forests and Gradient Boosted Trees, were applied to disease detection in attempts to improve robustness over single classifiers. Pantazi *et al.* (2019) evaluated Random Forest, SVM, and one-class classifier ensembles on hyperspectral canopy images of wheat plants, demonstrating that ensemble approaches improved generalisation across growing stages. However, the requirement for hyperspectral imaging equipment limits the practical applicability of such approaches to specialised research settings rather than general-purpose field deployment.

**Summary and Transition**

The principal lessons from the classical machine learning era for plant disease detection are: (i) that handcrafted features exhibit a generalisation ceiling that prevents deployment-quality performance under real field conditions; (ii) that while SVMs demonstrated the best discriminative capacity among shallow classifiers, they remained dependent on the quality of the feature extraction stage; and (iii) that the computational cost of many proposed pipelines was incompatible with real-time or mobile deployment. These limitations created the clear demand for a learning approach in which feature extraction and classification were jointly optimised from data.

---

## 2.3 Deep Learning for Agricultural Image Classification

The introduction of deep CNNs to the plant disease recognition problem marked a step-change in achievable performance and opened a pathway toward domain-general solutions.

**The PlantVillage Dataset and AlexNet Baseline**

The landmark contribution of Mohanty *et al.* (2016), published in *Frontiers in Plant Science*, established the de facto benchmark for plant disease classification. The authors compiled and released the PlantVillage dataset—54,306 images of leaves from 14 crop species, representing 26 disease classes plus healthy categories—photographed under controlled background conditions. They fine-tuned AlexNet and GoogLeNet on this dataset, achieving 99.35 percent accuracy on the held-out test set (random split) and demonstrating the dramatic superiority of deep feature learning over handcrafted alternatives. This work ignited widespread research interest in CNN-based plant disease detection and established the transfer-learning paradigm—initialising with weights pre-trained on ImageNet and fine-tuning on domain-specific data—as the standard methodology.

However, a critical caveat accompanied the strong benchmark results: when models trained on PlantVillage were evaluated on images collected in actual field conditions (variable backgrounds, natural lighting, sensor perspective, growth stage diversity), accuracy dropped precipitously. Mohanty *et al.* themselves noted this limitation, and subsequent work by Ramcharan *et al.* (2017) on cassava disease detection quantified the degradation empirically, demonstrating that models trained on PlantVillage generalised poorly to field images of the same crop.

**VGGNet, ResNet, and Deeper Architectures**

Following the PlantVillage benchmark, researchers applied progressively deeper CNN architectures to plant disease classification. Ferentinos (2018) evaluated VGG16, AlexNet, and a custom shallow CNN on the PlantVillage dataset, reporting 99.53 percent top-1 accuracy for VGG16. While this represented a marginal improvement over the GoogLeNet baseline, the practical value was limited by the continued reliance on controlled-background laboratory imagery.

ResNet architectures, with their residual skip connections enabling training of very deep networks (50–152 layers) without vanishing gradient degradation, proved particularly effective for plant disease classification on domain-specific datasets. Brahimi *et al.* (2017) applied ResNet-50 to tomato disease classification, demonstrating strong performance on a subset of PlantVillage classes. Rangarajan *et al.* (2018) applied both AlexNet and VGG-16 to tomato leaf disease detection with real-field images, finding that while both achieved reasonable performance, the class imbalance inherent in field-collected data significantly degraded recall for minority disease classes.

**EfficientNet and MobileNet for Edge Deployment**

The practical requirement for on-device or low-resource server inference motivated the adoption of computationally efficient architectures. Howard *et al.* (2017) introduced MobileNets, which use depthwise separable convolutions to achieve a dramatic reduction in parameter count and multiply-accumulate operations relative to standard convolutions, making CNN inference feasible on mobile CPUs. Tan and Le (2019) introduced EfficientNet, a family of models whose width, depth, and resolution are jointly scaled according to a compound coefficient determined by neural architecture search, achieving superior accuracy-to-compute ratios compared to ResNet and VGG across a range of image classification benchmarks.

Both MobileNet and EfficientNet variants have been applied to plant disease classification with results competitive with larger architectures at substantially lower computational cost. Karthik *et al.* (2020) demonstrated MobileNetV2 applied to rice leaf disease classification with 95.4 percent accuracy, while Ghaiwat and Arora (2014) applied a hybrid CNN approach to wheat diseases with promising results.

**Limitation: Classification vs. Detection**

The critical limitation that unifies all classification-based approaches—irrespective of the CNN architecture—is that they produce a single class prediction for an entire input image. This is adequate when the input is a carefully cropped, single-leaf image showing a single disease condition. In realistic field conditions, a photograph of a sugarcane plant section may contain both diseased and healthy tissue, multiple concurrent disease conditions, or a mix of disease damage and insect damage. A classification model applied to such an image can only predict the dominant class (or, in multi-label formulations, a set of class probabilities), with no information about the spatial distribution of pathological regions. This limitation is directly motivating for the adoption of detection and segmentation approaches as in the present project.

---

## 2.4 YOLO Series Evolution and Agricultural Applications

The You Only Look Once (YOLO) architecture family, introduced by Redmon *et al.* in 2016, has undergone successive generations of development that have substantially expanded its speed-accuracy Pareto frontier and its applicability to fine-grained detection tasks including agricultural image analysis.

**YOLOv1 (2016)**

Redmon *et al.* (2016) introduced YOLO as a single-stage detector that reformulates object detection as a single regression problem. The input image is divided into an S×S grid; each grid cell predicts B bounding boxes with associated confidence scores and C class probabilities. The entire prediction is made by a single forward pass through a unified CNN, achieving real-time inference at 45 frames per second on a Titan X GPU while achieving 63.4 mean Average Precision (mAP) on PASCAL VOC 2012—substantially faster than contemporary two-stage detectors (RCNN, Fast RCNN) at the cost of some accuracy, particularly for small objects.

**YOLOv2 and YOLO9000 (2017)**

YOLO9000 (Redmon and Farhadi, 2017) introduced batch normalisation, high-resolution classifiers, anchor boxes derived from dataset clustering, and multi-scale prediction, improving mAP to 78.6 on PASCAL VOC 2007 at 67 FPS. The joint training strategy over COCO detection and ImageNet classification data enabled the model to detect over 9,000 object categories, establishing YOLO as a practical architecture for open-vocabulary detection.

**YOLOv3 (2018)**

Redmon and Farhadi (2018) introduced multi-scale predictions at three feature pyramid levels, Darknet-53 as backbone, and binary cross-entropy for class prediction, enabling substantially improved small-object detection. YOLOv3 achieved 57.9 mAP at 50 IoU on COCO with an inference time of 51 ms on a Titan X GPU, and it became the most widely adopted YOLO variant in agricultural research applications due to its favourable balance of accuracy and speed.

Several studies applied YOLOv3 to crop disease and pest detection. Fuentes *et al.* (2017) demonstrated a modified YOLOv3 for tomato disease and pest detection under field conditions, achieving 96 percent overall accuracy on a multi-disease, field-collected dataset—a landmark result demonstrating the viability of object detection for multi-condition plant disease diagnosis. Cheng *et al.* (2019) applied YOLOv3 to rice blast detection, and Sun *et al.* (2019) demonstrated YOLOv3-based maize leaf disease detection, both achieving mAP values exceeding 80 percent on domain-specific datasets.

**YOLOv4 and YOLOv5 (2020)**

Bochkovskiy *et al.* (2020) introduced YOLOv4, incorporating CSPDarknet as backbone, PANet for neck feature aggregation, and a suite of "bag of freebies" augmentation and regularisation techniques (mosaic augmentation, DropBlock, label smoothing, CIoU loss), achieving 43.5 mAP on COCO at 65 FPS. YOLOv5, released by Ultralytics as an open-source PyTorch implementation in 2020, introduced model scaling to nano, small, medium, large, and extra-large variants, with the nano variant (YOLOv5n) achieving 28.0 mAP on COCO at sub-6ms CPU inference—making real-time detection feasible on single-board computer hardware.

**YOLOv6 and YOLOv7 (2022)**

Li *et al.* (2022) introduced YOLOv6-3.0, with an efficient reparametrisable backbone and a decoupled head for separate classification and localisation prediction. Wang *et al.* (2022) introduced YOLOv7 with Extended Efficient Layer Aggregation Network (ELAN) and various trainable bag-of-freebies techniques, achieving 56.8 AP on COCO at 161 FPS—at the time the fastest real-time detector in its accuracy class.

**YOLOv8 (2023) — The Architecture Used in This Project**

Ultralytics released YOLOv8 in January 2023 as a comprehensive re-implementation and extension of the YOLO family. YOLOv8 introduces an anchor-free detection head (eliminating the manual anchor hyperparameter tuning required by earlier versions), a new C2f (Cross Stage Partial with Feature Fusion) backbone block replacing the C3 block of YOLOv5/v7, and a unified training and inference API supporting detection, instance segmentation, pose estimation, classification, and oriented bounding box tasks within the same framework.

The YOLOv8n (nano) variant, used for both detection and segmentation in this project, has the following characteristics:

| Attribute | YOLOv8n Detection | YOLOv8n Segmentation |
|---|---|---|
| Parameters | 3.2M | 3.4M |
| Model file size | ~6.3 MB (FP32) | ~6.7 MB (FP32) |
| COCO mAP@50-95 (box) | 37.3 | 36.7 |
| COCO mAP@50-95 (mask) | — | 30.5 |
| CPU inference (ms/img) | ~80 | ~110 |
| GPU inference (ms/img) | ~1.5 | ~2.1 |

*Source: Ultralytics YOLOv8 official benchmarks (COCO val2017, 640×640 input).*

The anchor-free design of YOLOv8 simplifies training for custom datasets, as there is no requirement to pre-compute anchor shapes via k-means clustering on bounding box dimensions. The unified Ultralytics API further simplifies the transition from detection to segmentation by providing a consistent interface for both model types, which directly informed the dual-model architecture design of this project.

**YOLO Architecture Comparison Table**

| Version | Year | Backbone | mAP@50 COCO | FPS (GPU) | Notable Innovation |
|---|---|---|---|---|---|
| YOLOv1 | 2016 | Darknet-24 | 63.4 (VOC) | 45 | Single-stage regression detection |
| YOLOv2 | 2017 | Darknet-19 | 78.6 (VOC) | 67 | Anchor boxes, multi-scale |
| YOLOv3 | 2018 | Darknet-53 | 57.9 (COCO) | 20 | Feature pyramid, binary CE |
| YOLOv4 | 2020 | CSPDarknet-53 | 65.7 (COCO) | 65 | Bag-of-freebies, PANet neck |
| YOLOv5n | 2020 | CSP-EfficientRep | 45.7 (COCO) | 140 | Model scaling, PyTorch native |
| YOLOv7 | 2022 | ELAN | 56.8 (COCO) | 161 | ELAN, extended auxiliary heads |
| YOLOv8n | 2023 | C2f CSP | 52.9 (COCO) | 600+ | Anchor-free, unified task API |

*FPS benchmarks measured on NVIDIA A100 or Tesla V100 GPU. VOC mAP measured at IoU=0.5; COCO mAP measured at IoU=0.5:0.95 unless noted.*

**YOLO in Agricultural Settings**

The YOLO architecture family has been widely adopted in precision agriculture research. Ozguven and Adem (2019) applied YOLOv3 to sugar beet and weed detection in field imagery, achieving 89.4 percent mAP. Cheng *et al.* (2021) demonstrated YOLOv5 for rice leaf disease detection, outperforming YOLOv3 by 4.3 percentage points in mAP@50 on the same dataset. Zhao *et al.* (2022) applied YOLOv5-L to apple fruit detection in orchard conditions, achieving 96.3 percent mAP@50 with robustness to partial occlusion and varying illumination. Notably, Naikwadi and Amoda (2023) applied a YOLOv5-based model to sugarcane internode detection, demonstrating the applicability of single-stage detectors to sugarcane-specific imagery.

For sugarcane disease and insect detection specifically, the literature is considerably sparser. A comprehensive literature search identified no published work applying YOLOv8—the current state of the art—to the combined detection of sugarcane diseases and insect pests from leaf or stalk imagery, confirming a genuine and addressable research gap.

---

## 2.5 Instance Segmentation vs. Object Detection in Plant Pathology

Object detection, as provided by the YOLO detection models, localises disease or pest regions with axis-aligned bounding boxes. Instance segmentation extends this by predicting a binary mask that delineates the precise pixel-level boundary of each detected instance. This distinction has significant practical implications for plant disease severity assessment.

**Bounding Box Limitations for Severity Estimation**

A bounding box enclosing a leaf spot lesion will invariably include a portion of surrounding healthy tissue, since most lesions are not perfectly rectangular. If the proportion of affected area is computed from bounding box area relative to total image area, the resulting metric systematically overestimates the true affected proportion. For a circular lesion of radius r, the bounding box (2r × 2r) overestimates the lesion area by a factor of 4/π ≈ 1.27—a 27 percent overestimate even for the simplest idealized case. For irregularly shaped lesions with high perimeter-to-area ratios (as observed in many foliar disease patterns), the overestimation is substantially greater.

**Instance Segmentation for Precise Area Measurement**

Instance segmentation masks provide pixel-level accuracy in region delineation, enabling precise computation of lesion area, shape descriptors, and spatial distribution—all of which are diagnostically relevant. Pantazi *et al.* (2021) demonstrated that pixel-level segmentation of wheat yellow rust lesions enabled significantly more accurate disease severity scoring than bounding-box-based approaches, with severity categories (trace, low, moderate, high) achievable through mask area ratio thresholds.

In the context of sugarcane, where disease severity scoring informs critical management decisions such as whether to apply fungicide sprays (which are economically justified only above a certain damage threshold), the precision of instance segmentation relative to bounding-box detection is directly actionable.

**Comparison: Detection vs. Segmentation for Disease Assessment**

| Criterion | Bounding Box Detection | Instance Segmentation |
|---|---|---|
| Spatial localisation | Approximate (rectangle) | Pixel-precise |
| Affected area estimation | Overestimates (by 20–50%+) | Accurate |
| Inference speed | Faster | ~30–40% slower |
| Training annotation effort | Lower (boxes) | Higher (masks) |
| Severity scoring precision | Coarse | Fine-grained |
| Multi-instance overlap handling | Limited | Supported |

The YOLOv8 segmentation model used in this project addresses this limitation by providing full instance masks alongside class labels and confidence scores. The `yolov8_seg.pt` model outputs per-instance binary masks that are overlaid on the original image and used to compute the Health Index metric, enabling severity scoring grounded in actual affected pixel count rather than bounding box proxy measures.

**YOLO-Based Segmentation in Plant Science**

Zhao *et al.* (2023) applied YOLOv8-Seg to cucumber disease detection and leaf segmentation, demonstrating competitive performance against Mask R-CNN with substantially faster inference (15× speedup). Qi *et al.* (2023) applied YOLOv8-Seg for rice leaf blast lesion segmentation, achieving mAP@50 of 0.87 and demonstrating that the anchor-free YOLOv8 head generalised better to small lesion instances than the anchor-based YOLOv5 predecessor on the same dataset.

---

## 2.6 Web-Based Agricultural Decision Support Systems

An agricultural decision support system (DSS) is a software tool designed to assist farmers, extension workers, or agronomists in making evidence-based management decisions by integrating sensor data, knowledge bases, and analytical models. The integration of machine learning-based plant disease detection into web-accessible DSS platforms has been an active area of development since approximately 2018.

**Early Web-Based Plant Disease Portals**

Plantix (Peat GmbH, Germany), launched in 2015, is among the earliest commercially deployed plant disease diagnosis applications, providing disease classification from smartphone photographs via a mobile app backed by a cloud-hosted deep learning model. The application offers treatment recommendations and a community forum, and has been adopted by over 10 million farmers across Southeast Asia and sub-Saharan Africa as of 2023. Its commercial success validates the market demand for accessible, AI-powered disease diagnosis tools and establishes benchmarks for user experience design in agricultural AI applications.

The PlantNet platform (Affouard *et al.*, 2017), developed by a consortium of French research institutions, provides botanical identification from smartphone photographs via both a mobile application and a web API, demonstrating the technical feasibility of high-throughput cloud inference for plant image analysis.

**FastAPI and REST API Architecture for ML Serving**

The choice of FastAPI as the serving framework for this project is supported by a convergence of technical and community factors. FastAPI, introduced by Sebastián Ramírez in 2018, leverages Python's type annotation system and Pydantic data models to provide automatic OpenAPI schema generation, input validation, and serialisation, with an asynchronous foundation built on Starlette and ASGI. Benchmark studies by the TechEmpower framework benchmark suite place FastAPI among the fastest Python web frameworks, with throughput competitive with Node.js Express for I/O-bound workloads and superior to Flask or Django REST Framework for concurrent request handling.

Jaiswal *et al.* (2022) demonstrated a FastAPI-based plant disease detection API serving a MobileNetV2 model, achieving average response times of 120 ms per request on a low-cost cloud instance—a result consistent with the performance targets of the present system. The async request handling capability of FastAPI is specifically valuable for an agricultural detection system where individual inference calls can take 50–200 ms depending on model and input size, and concurrent users should not block one another during inference.

**Progressive Web Applications in Agricultural Contexts**

Progressive Web Applications (PWAs), as defined by Google's PWA technical criteria, deliver web application experiences with offline capability, home screen installation, and push notifications through Service Worker APIs. Several agricultural extension organisations have adopted PWA architecture for field tools: the FAO (Food and Agriculture Organization) published guidelines on PWA adoption for agricultural mobile tools in 2020, emphasising the benefits for users in low-connectivity rural environments where native app store distribution is impractical. The service worker and manifest files present in this project (`interface/static/sw.js`, `interface/static/manifest.json`) implement PWA compliance, enabling installation on Android and iOS devices without requiring Play Store or App Store distribution.

**Treatment Recommendation Knowledge Bases**

The integration of structured knowledge bases that map detected disease or pest classes to recommended treatment actions is a well-established pattern in agricultural DSS. Expert systems combining image-based diagnosis with rule-based treatment recommendation have been described for rice (Phadikar and Sil, 2012), maize (Liu *et al.*, 2021), and tomato (Ferentinos, 2018). The JSON-format treatment knowledge base (`interface/disease_recommendations.json`) in this project follows this established pattern, providing chemical and cultural control recommendations keyed by disease class and confidence tier.

---

## 2.7 User Authentication in Agricultural Software

While the majority of plant disease detection research publications focus exclusively on model performance, the deployment of detection systems as multi-user applications introduces requirements for identity management, data privacy, and session security that are rarely addressed in academic literature. The choices made in this project's authentication implementation follow established web security standards.

**JWT-Based Authentication**

JSON Web Tokens (JWT), standardised in RFC 7519 (Jones *et al.*, 2015), provide a compact, URL-safe means of representing claims between two parties. A JWT consists of three Base64URL-encoded segments: a header (algorithm identifier), a payload (claims), and a signature (HMAC or RSA). The stateless nature of JWT authentication—where the server does not maintain session state, as the token itself encodes the authenticated user identity and expiry claim—makes it well-suited to REST APIs deployed on horizontally scalable infrastructure.

This project implements JWT token issuance at login, with a configurable ACCESS_TOKEN_EXPIRE_MINUTES parameter (defaulting to 24 hours) and HS256 HMAC-SHA256 signing via the `python-jose` library. Token validation is performed by a dependency injection pattern in FastAPI (`get_current_user`, `get_current_user_required`), which decodes and verifies the token on each protected request.

**Password Hashing Standards**

The PBKDF2-HMAC-SHA256 algorithm, used in this project through the Passlib `pbkdf2_sha256` scheme, is recommended by NIST Special Publication 800-132 (Turan *et al.*, 2010) for password-based key derivation. With a sufficient iteration count (Passlib default: 29,000 rounds in 2024), PBKDF2 provides resistance to brute-force and dictionary attacks that is appropriate for an agricultural web application handling personal user data. The bcrypt alternative (also supported by Passlib) provides comparable security characteristics; the choice of PBKDF2 in this project is consistent with NIST guidance and FIPS 140-2 compliance requirements that may apply to government-facing agricultural deployments.

**Per-User Data Isolation**

The SQLAlchemy-based data model in this project (`interface/database.py`) implements per-user scan history through a foreign key relationship between the `ScanHistory` and `User` tables. The `/api/history` and `/api/stats` endpoints extract the authenticated user identity from the validated JWT token and scope all database queries to the corresponding `user_id`, ensuring that users cannot access each other's scan records. This data isolation pattern is consistent with the privacy requirements of agricultural data—which may be commercially sensitive for farmers—and anticipates future multi-tenancy scaling.

---

## 2.8 Summary and Research Gap

The preceding review establishes the following state of knowledge relevant to this project:

**What has been established in prior work:**
- Deep CNN architectures (ResNet, EfficientNet, MobileNet) achieve high accuracy (>95%) for plant disease classification on curated benchmark datasets, but generalise poorly to field conditions due to the fixed handcrafted feature–learning gap and the single-label classification paradigm.
- The YOLO family of real-time object detectors has evolved from YOLOv1 (2016) to YOLOv8 (2023), with progressive improvements in speed, accuracy, and multi-task capability. YOLOv8 represents the current state of the art and introduces anchor-free detection, a unified task API, and native instance segmentation support.
- Instance segmentation methods (Mask R-CNN, YOLOv8-Seg) outperform bounding-box detection for disease severity area estimation, providing pixel-precise lesion delineation that enables clinically meaningful severity scoring.
- Web-based agricultural DSS platforms (Plantix, PlantNet) demonstrate strong market demand for accessible AI-powered disease diagnosis, but are proprietary systems with limited extensibility.
- FastAPI provides the performance and developer-experience characteristics required for production-quality ML inference APIs, and PWA architecture enables mobile deployment without app store distribution.
- JWT and PBKDF2-SHA256 provide NIST-recommended security standards for web application authentication and password management.

**The research gap addressed by this project:**

| Gap Dimension | Prior State | This Project |
|---|---|---|
| Crop specificity | Mostly rice, tomato, maize; very few sugarcane systems | Custom YOLOv8 trained on sugarcane-specific dataset |
| YOLO version | Most agricultural studies use YOLOv3 or YOLOv5 | YOLOv8 (current state of the art, 2023) |
| Detection modality | Bounding box detection or classification only | Dual-model: bounding box + instance segmentation |
| System completeness | Research prototypes; no end-to-end deployable application | Full-stack: API + frontend + auth + reporting |
| Accessibility | Python scripts with local file paths; expert-only operation | Browser-accessible, mobile-friendly PWA |
| User management | Single-user or unauthenticated | JWT-authenticated, per-user history and statistics |
| Severity assessment | Coarse or absent | Health Index computed from segmentation mask areas |
| Deployment | Not containerised; environment-dependent | Dockerised; deployed on Hugging Face Spaces |

No prior published work identified in this review combines YOLOv8-based dual-mode detection and segmentation for sugarcane diseases and insect pests with a full-stack web deployment featuring user authentication, scan history persistence, PDF report generation, and a Progressive Web App interface. This project therefore represents a novel and complete implementation at the intersection of contemporary deep learning, agricultural computer vision, and production web engineering.

---

*End of Chapter 2*

---

> **Note:** Chapters 3 through 6, References, and Appendices will be added in subsequent generation steps.
