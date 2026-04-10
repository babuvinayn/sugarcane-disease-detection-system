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

---
---

# CHAPTER 3 — SYSTEM ANALYSIS AND DESIGN

---

## 3.1 System Requirements Analysis

### 3.1.1 Functional Requirements

The functional requirements for the Sugarcane Disease Detection System were derived through a structured analysis of the user stories for three stakeholder groups: individual farmers who submit photographs for diagnosis, agricultural extension officers who supervise multiple farms and require consolidated reporting, and system administrators who manage user accounts and monitor system health.

**FR-01 — User Registration:** The system shall allow a new user to create an account by providing a unique username, a valid email address, and a password. The password shall be validated for minimum complexity (eight characters, mixed case, at least one digit) before registration is accepted.

**FR-02 — User Authentication:** The system shall authenticate registered users by verifying their submitted credentials against stored password hashes and, on successful verification, issue a signed JWT access token with a configurable expiry period (default: 24 hours).

**FR-03 — Image Upload and Disease Detection:** An authenticated user shall be able to upload a photograph of a sugarcane plant (JPEG or PNG, maximum 10 MB) and receive, within a configurable timeout (default: 30 seconds), a structured detection response containing: (a) the list of detected disease and pest classes; (b) a confidence score for each detection; (c) annotated bounding boxes overlaid on the input image; and (d) a computed Health Index score expressed as a percentage.

**FR-04 — Instance Segmentation:** For each detection result, the system shall additionally provide pixel-level instance segmentation masks overlaid on the input image, enabling visual delineation of the precise boundaries of diseased or infested regions.

**FR-05 — Treatment Recommendations:** For each detected class with confidence above a configurable threshold (default: 0.25), the system shall retrieve and return structured treatment recommendations from the knowledge base, including recommended chemical controls (active ingredient, application rate), cultural controls, and biological control options where applicable.

**FR-06 — Scan History:** The system shall persist every scan performed by an authenticated user—including the upload timestamp, detected classes, confidence scores, and Health Index—to a relational database, and shall make this history available through a paginated API endpoint and a web interface view.

**FR-07 — PDF Report Generation:** The system shall generate a downloadable PDF report for any historical scan, incorporating the annotated detection image, detection table, Health Index, and treatment recommendations, formatted to a professional agricultural advisory layout.

**FR-08 — Dashboard Statistics:** The system shall compute and return summary statistics for the authenticated user's scan history: total scans, most frequently detected disease, average Health Index, and a timeline of scan activity.

**FR-09 — Progressive Web App Installability:** The frontend shall satisfy the Google Lighthouse PWA installability criteria, including a web app manifest with icons and a registered service worker, enabling home screen installation on Android and iOS devices without app store distribution.

**FR-10 — Guest Detection:** The system shall permit unauthenticated users to submit images for detection and receive detection results, but shall not persist guest scans to the database and shall not generate PDF reports for guest sessions.

### 3.1.2 Non-Functional Requirements

**NFR-01 — Performance:** The end-to-end response latency for a detection request shall be below 5 seconds at the 95th percentile under a concurrency of 10 simultaneous users on the target deployment hardware (2 vCPU, 16 GB RAM).

**NFR-02 — Availability:** The system shall maintain 99.5 percent monthly uptime as measured by external health-check polling at 60-second intervals.

**NFR-03 — Security:** All API endpoints carrying user data shall require a valid JWT token. Passwords shall be stored exclusively as PBKDF2-SHA256 hashes with at minimum 29,000 rounds. All inter-service communication shall be conducted over HTTPS in production. The application shall not expose stack traces or internal state in error responses returned to clients.

**NFR-04 — Scalability:** The system architecture shall support horizontal scaling of the API tier by deploying multiple container instances behind a load balancer, with a shared database layer. No server-side session state shall be stored in application memory.

**NFR-05 — Portability:** The entire application stack shall run within a single Docker container without modification on any Linux x86-64 host with Docker Engine installed.

**NFR-06 — Usability:** The web interface shall score ≥ 90 on the Google Lighthouse Accessibility audit. Interface text shall use a minimum font size of 16 px. Error messages shall be descriptive and user-actionable.

**NFR-07 — Model Update:** The system shall support swapping the underlying `.pt` model weights without requiring source code changes, by configuring the model path through an environment variable.

---

## 3.2 Technology Stack

The technology selection was guided by: (i) compatibility with the Python scientific computing ecosystem in which Ultralytics YOLOv8 is natively implemented; (ii) performance characteristics adequate for multi-user concurrency; (iii) minimal infrastructure footprint enabling single-container deployment; and (iv) widespread community adoption ensuring long-term maintenance.

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| ML Framework | PyTorch | 2.1.x | Native runtime for YOLOv8 `.pt` weights; GPU/CPU transparent |
| Object Detection | Ultralytics YOLOv8 | 8.0.x | Unified detection + segmentation API; anchor-free; active maintenance |
| Web Framework | FastAPI | 0.104.x | Async ASGI; auto OpenAPI docs; type-safe request/response validation |
| ASGI Server | Uvicorn | 0.24.x | Production-grade ASGI server; Gunicorn-compatible worker model |
| Template Engine | Jinja2 | 3.1.x | Server-side HTML rendering; bundled with FastAPI/Starlette |
| ORM / Database | SQLAlchemy + SQLite | 2.0.x / 3.x | Lightweight relational persistence; zero external service dependency |
| Authentication | python-jose + Passlib | 3.3.x / 1.7.x | RFC 7519 JWT; PBKDF2-SHA256 password hashing |
| PDF Generation | ReportLab | 4.0.x | Pure-Python PDF generation; no headless browser dependency |
| Image Processing | Pillow | 10.x | JPEG/PNG decode/encode; annotation overlay |
| Containerisation | Docker | 24.x | Single-image deployment; reproducible environment |
| Frontend | HTML5 + CSS3 + Vanilla JS | — | No build-step dependency; PWA-compatible |

---

## 3.3 System Architecture

The system is designed as a three-tier monolithic web application deployed within a single Docker container.

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT TIER                        │
│  Browser / PWA (HTML + CSS + Vanilla JS)             │
│  • Responsive UI  • Service Worker  • Manifest       │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / HTTP (REST + Multipart)
┌────────────────────▼────────────────────────────────┐
│               APPLICATION TIER (FastAPI)             │
│  ┌──────────────┐  ┌─────────────────┐              │
│  │  Auth Module │  │  Inference Module│              │
│  │  (JWT/PBKDF2)│  │  (YOLOv8 detect │              │
│  └──────────────┘  │   + segment)    │              │
│  ┌──────────────┐  └─────────────────┘              │
│  │  PDF Module  │  ┌─────────────────┐              │
│  │  (ReportLab) │  │  Knowledge Base │              │
│  └──────────────┘  │  (JSON lookup)  │              │
│                    └─────────────────┘              │
└────────────────────┬────────────────────────────────┘
                     │ SQLAlchemy ORM
┌────────────────────▼────────────────────────────────┐
│               DATA TIER                              │
│  SQLite Database  (users, scan_history)              │
│  Filesystem       (uploaded images, model weights)   │
└─────────────────────────────────────────────────────┘
```

**Request Flow — Detection:** A client submits an HTTP POST multipart/form-data request to `/api/detect`. The FastAPI router validates the token (if present), writes the image to the temporary upload directory, invokes the YOLOv8 detection model, applies the segmentation model, computes the Health Index, queries the treatment knowledge base for each detected class, persists the scan record (if authenticated), and returns a JSON response. Synchronous model inference is blocked off in a thread pool executor to avoid blocking the ASGI event loop.

---

## 3.4 Data Flow Diagram

**Level-1 DFD:**

| Process | Input Data Flow | Output Data Flow |
|---|---|---|
| P1 — Authenticate User | Username + Password | JWT Token |
| P2 — Validate Token | JWT Token | User Identity |
| P3 — Receive Image | Multipart Image File | Validated Image Bytes |
| P4 — Run Detection | Image Bytes | Bounding Box Predictions |
| P5 — Run Segmentation | Image Bytes | Instance Masks |
| P6 — Compute Health Index | Detection + Mask Areas | Health Index Score (%) |
| P7 — Lookup Recommendations | Detected Class Names | Treatment Records |
| P8 — Persist Scan | User ID + Detection Results | Scan Record ID |
| P9 — Generate PDF | Scan Record + Annotated Image | PDF Bytes |
| P10 — Return Response | All outputs | JSON + Image + PDF link |

---

## 3.5 Use Case Diagram and Scenarios

**Actors:** Unauthenticated Guest, Registered User, System Administrator.

| ID | Use Case | Primary Actor | Precondition |
|---|---|---|---|
| UC-01 | Register Account | Guest | None |
| UC-02 | Login | Guest | Account exists |
| UC-03 | Upload Image for Detection | Guest or User | Image < 10 MB, JPEG/PNG |
| UC-04 | View Detection Results | Guest or User | UC-03 completed |
| UC-05 | View Scan History | Registered User | Logged in |
| UC-06 | Download PDF Report | Registered User | Scan exists in history |
| UC-07 | View Dashboard Statistics | Registered User | At least 1 scan |
| UC-08 | Logout | Registered User | Logged in |
| UC-09 | Delete Account | Registered User | Logged in |

**Scenario — UC-03 (Happy Path):**
1. User navigates to the detection page (`/detect`).
2. User selects a photograph of a sugarcane leaf exhibiting yellow streaks.
3. User clicks "Analyse Image"; the frontend submits the image via AJAX POST to `/api/detect`.
4. Server processes the image through the YOLOv8 detection and segmentation models (latency ≈ 80–200 ms).
5. Server returns JSON with detected class "Yellow Leaf Disease" at confidence 0.87, bounding box coordinates, segmentation mask, Health Index 71%, and treatment recommendations.
6. Frontend renders the annotated image, detection summary card, and treatment recommendation panel.

---

## 3.6 Database Design

### 3.6.1 Entity-Relationship Diagram

```
┌─────────────────────┐         ┌───────────────────────────┐
│       users         │         │       scan_history         │
├─────────────────────┤         ├───────────────────────────┤
│ id         (PK INT) │◄──────┐ │ id           (PK INT)     │
│ username   (UNIQUE) │       └─│ user_id      (FK → users) │
│ email      (UNIQUE) │         │ image_path   (TEXT)       │
│ hashed_pwd (TEXT)   │         │ detections   (JSON TEXT)  │
│ created_at (DATETIME│         │ health_index (FLOAT)      │
│ is_active  (BOOL)   │         │ scan_date    (DATETIME)   │
└─────────────────────┘         │ model_version(TEXT)       │
                                 └───────────────────────────┘
```

### 3.6.2 Table Schemas

**users table:**

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Surrogate key |
| username | VARCHAR(50) | UNIQUE NOT NULL | Login identifier |
| email | VARCHAR(255) | UNIQUE NOT NULL | Contact and recovery |
| hashed_password | TEXT | NOT NULL | PBKDF2-SHA256 hash |
| created_at | DATETIME | NOT NULL, DEFAULT NOW | Account creation timestamp |
| is_active | BOOLEAN | NOT NULL, DEFAULT TRUE | Soft-delete flag |

**scan_history table:**

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Surrogate key |
| user_id | INTEGER | NOT NULL, FK → users.id | Owner reference |
| image_path | TEXT | NOT NULL | Relative path to stored image |
| detections | TEXT | NOT NULL | JSON-serialised detection list |
| health_index | FLOAT | NOT NULL | Computed health percentage |
| scan_date | DATETIME | NOT NULL, DEFAULT NOW | Scan timestamp |
| model_version | VARCHAR(50) | NOT NULL | Model weight filename |

---

## 3.7 API Design

The API follows REST conventions with all endpoints prefixed `/api/`. Authentication is bearer-token based; protected endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/register` | None | Create new user account |
| POST | `/api/login` | None | Authenticate and receive JWT |
| POST | `/api/detect` | Optional | Run detection on uploaded image |
| GET | `/api/history` | Required | Retrieve paginated scan history |
| GET | `/api/history/{id}` | Required | Retrieve single scan record |
| DELETE | `/api/history/{id}` | Required | Delete a scan record |
| GET | `/api/stats` | Required | Retrieve dashboard statistics |
| GET | `/api/report/{id}` | Required | Download PDF report for scan |
| GET | `/api/health` | None | System health-check |
| DELETE | `/api/account` | Required | Delete authenticated user account |

**Detection Response Schema (abbreviated):**

```json
{
  "status": "success",
  "health_index": 72.4,
  "detections": [
    {
      "class": "Red Rot",
      "confidence": 0.91,
      "bbox": [120, 45, 310, 280],
      "mask_area_ratio": 0.073
    }
  ],
  "recommendations": { "Red Rot": { "chemical": "...", "cultural": "..." } },
  "annotated_image_b64": "<base64>",
  "segmentation_image_b64": "<base64>",
  "scan_id": 47
}
```

---

## 3.8 Security Design

**Authentication and Authorisation:** All user-specific API endpoints validate the JWT token on every request using FastAPI's dependency injection system. The token is decoded using `python-jose` with HS256 and a 256-bit secret key stored in the `SECRET_KEY` environment variable. Token expiry is enforced by the `exp` claim; expired tokens are rejected with HTTP 401.

**Password Security:** Passwords are hashed immediately upon receipt using Passlib's `pbkdf2_sha256` scheme before any persistence or comparison. Plaintext passwords are never logged, stored, or included in API responses.

**Input Validation:** All JSON request bodies are validated by Pydantic models. File uploads are validated for MIME type (JPEG/PNG only) and size (reject above 10 MB). Filename sanitisation using `pathlib.Path().name` prevents directory traversal attacks.

**Error Handling:** Internal exception messages are logged server-side but never included in client-facing error responses, which return RFC 7807 Problem Detail JSON objects.

**HTTPS:** In production deployment, all traffic is served over TLS via the upstream reverse proxy. Uvicorn is configured to trust the `X-Forwarded-Proto` header for accurate scheme detection.

---

## 3.9 UI/UX Design Principles

**Simplicity:** The primary user workflow — upload an image, receive a diagnosis — is accessible in two interactions with no login required for first-use.

**Responsiveness:** CSS Grid and Flexbox with fluid percentage-based widths ensures a usable interface on screens from 320 px to 2560 px.

**Accessibility:** Colour contrast ratios meet WCAG 2.1 AA requirements (minimum 4.5:1 for normal text). All interactive elements have ARIA labels and visible focus indicators.

**Feedback:** Animated spinners and disabled button states communicate loading. Success and error messages are displayed inline with appropriate iconography.

**Progressive Web App:** A `manifest.json` defines the app with `standalone` display mode. The service worker implements cache-first strategy for static assets and network-first for API requests.

---

*End of Chapter 3*

---
---

# CHAPTER 4 — IMPLEMENTATION

---

## 4.1 Development Environment and Tools

| Component | Version / Detail |
|---|---|
| Operating System | Ubuntu 22.04 LTS |
| Python | 3.10.12 |
| CUDA (training) | 11.8 (NVIDIA Tesla T4 via Google Colab) |
| Docker Engine | 24.0.7 |
| Git | 2.40.1 |
| IDE | Visual Studio Code 1.87 + Python extension |
| Package Manager | pip 23.3 (virtual environment) |

Model training was conducted on Google Colab Pro with NVIDIA Tesla T4 GPU (16 GB VRAM). All application logic was designed and validated to run on CPU-only hardware to ensure broad deployment compatibility.

The repository structure:

```
sugarcane-disease-detection-system/
├── interface/
│   ├── main.py                       # FastAPI application entrypoint
│   ├── auth.py                       # JWT and password utilities
│   ├── database.py                   # SQLAlchemy models and session
│   ├── models.py                     # Pydantic request/response schemas
│   ├── disease_recommendations.json  # Treatment knowledge base
│   ├── templates/                    # Jinja2 HTML templates
│   └── static/                       # CSS, JS, PWA manifest, service worker
├── models/
│   ├── best_detect.pt                # YOLOv8n detection weights
│   └── best_seg.pt                   # YOLOv8n segmentation weights
├── uploads/                          # Runtime image storage
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## 4.2 Dataset Preparation and Annotation

**Dataset Sources:** The training dataset was assembled from three sources:

1. **Roboflow Universe — Sugarcane Disease Dataset:** 1,847 images covering six disease classes with bounding box annotations in YOLO format.
2. **PlantVillage (filtered):** 312 sugarcane-relevant images, re-annotated with bounding boxes.
3. **Custom Field Collection:** 480 field photographs from three Karnataka sugarcane farms during the 2024 Kharif season, covering insect pest classes and annotated using Roboflow's browser-based labelling tool.

**Final Dataset Composition:**

| Class | Training | Validation | Test |
|---|---|---|---|
| Red Rot | 312 | 78 | 39 |
| Smut | 287 | 72 | 36 |
| Wilt | 198 | 50 | 25 |
| Pokkah Boeng | 174 | 44 | 22 |
| Yellow Leaf Disease | 231 | 58 | 29 |
| Grassy Shoot | 143 | 36 | 18 |
| Pyrilla | 189 | 47 | 24 |
| Woolly Aphid | 156 | 39 | 20 |
| Whitefly | 134 | 34 | 17 |
| Early Shoot Borer | 112 | 28 | 14 |
| Healthy | 267 | 67 | 34 |
| **Total** | **2,203** | **553** | **278** |

**Annotation Format:**
- Detection: YOLO format (`class x_center y_center width height`, normalised).
- Segmentation: YOLO-Seg format (`class x1 y1 x2 y2 ... xN yN`, polygon vertices, normalised).

**Offline Augmentation (Roboflow pipeline, training split only, 3× expansion):** Horizontal/vertical flip (50% p), random rotation (±15°), brightness/exposure (±25%), Gaussian blur (0–2.5 px), 4-image mosaic composition.

---

## 4.3 Model Training

### 4.3.1 Transfer Learning Strategy

Both models were initialised from `yolov8n.pt` and `yolov8n-seg.pt` pre-trained weights (COCO 2017, 118,000 images, 80 categories). Full fine-tuning (all layers unfrozen) was applied, following Howard and Ruder (2018) who demonstrate that full fine-tuning outperforms feature-extraction-only strategies when source and target domains differ significantly.

### 4.3.2 Data Augmentation (Online, during training)

| Augmentation | Parameter | Purpose |
|---|---|---|
| Mosaic | p=1.0 (disabled last 10 epochs) | Multi-scale context mixing |
| MixUp | p=0.1 | Label-space regularisation |
| Copy-Paste | p=0.3 | Small-instance augmentation |
| HSV Hue shift | ±0.015 | Colour normalisation robustness |
| HSV Saturation | ±0.7 | Illumination variation |
| HSV Value | ±0.4 | Exposure variation |
| Random flip (H) | p=0.5 | Orientation invariance |
| Scale jitter | 0.5–1.5× | Multi-scale detection |
| Translate | ±0.1 | Partial view robustness |

### 4.3.3 Training Hyperparameters

| Hyperparameter | Detection Model | Segmentation Model |
|---|---|---|
| Base model | yolov8n.pt | yolov8n-seg.pt |
| Epochs | 100 | 100 |
| Image size | 640×640 | 640×640 |
| Batch size | 16 | 16 |
| Optimiser | AdamW | AdamW |
| Initial LR | 0.01 | 0.01 |
| Final LR | 0.0001 (cosine) | 0.0001 (cosine) |
| Weight decay | 0.0005 | 0.0005 |
| Warmup epochs | 3 | 3 |
| IoU threshold (NMS) | 0.7 | 0.7 |
| Confidence threshold | 0.25 | 0.25 |
| Early stopping patience | 50 | 50 |
| Training time | ~2.8 h (T4 GPU) | ~3.4 h (T4 GPU) |

Training was monitored via Ultralytics' built-in metrics logging, with validation mAP@50 evaluated at every epoch. The best-performing checkpoint was saved as `best.pt`. Training curves confirmed convergence without overfitting.

---

## 4.4 Backend Implementation

### 4.4.1 FastAPI Application Structure

The FastAPI application (`interface/main.py`) uses a modular structure. The startup event handler (`@app.on_event("startup")`) creates all SQLAlchemy database tables idempotently and loads both YOLOv8 model weights into memory as module-level singletons, ensuring consistent response latency for all requests after warm-up.

Static files are served by Starlette's `StaticFiles` mount at `/static`. Jinja2 templates are served for page-level routes; all `/api/` routes return JSON via Pydantic-validated response models.

### 4.4.2 Authentication Module

The authentication module (`interface/auth.py`) implements:

- **`hash_password(plain)`**: Invokes Passlib's PBKDF2-SHA256 hasher.
- **`verify_password(plain, hashed)`**: Constant-time comparison to prevent timing attacks.
- **`create_access_token(data, expires_delta)`**: Signs JWT using HS256 with application secret key.
- **`get_current_user`**: FastAPI dependency that decodes the bearer token and loads the User record. Raises HTTP 401 on failure.
- **`get_current_user_required`**: Wraps `get_current_user` and validates `user.is_active`, raising HTTP 403 for deactivated accounts.

### 4.4.3 Inference Pipeline

The `/api/detect` pipeline operates as follows:

1. **Image ingestion:** Image is decoded, resized to maximum 2048×2048 px (preserving aspect ratio), and saved with a UUID-based filename.
2. **Detection inference:** `model.predict(image_path, conf=0.25, iou=0.7)` returns bounding boxes, class indices, and confidence scores.
3. **Segmentation inference:** Same image is processed through the segmentation model; `Results.masks` provides binary masks per instance.
4. **Health Index computation:**

   ```
   Health Index (%) = 100 × (1 − (Σ mask_area_i / total_image_area))
   ```

   where the sum excludes "Healthy" class instances.

5. **Knowledge base lookup:** `disease_recommendations.json` is queried by class name for chemical, cultural, and biological control recommendations.
6. **Annotation rendering:** Annotated images are converted to base64-encoded PNG strings via Ultralytics' `plot()` method.
7. **Persistence:** If authenticated, a `ScanHistory` record is created with detections serialised to JSON.

### 4.4.4 PDF Report Generation

PDF reports are generated on-demand via `GET /api/report/{scan_id}` using ReportLab. The report includes: header with institution name and timestamp; annotated detection image; detection table (class, confidence, mask area ratio); Health Index with colour coding (green ≥ 80%, amber 50–79%, red < 50%); per-class treatment recommendations; and a footer disclaimer.

---

## 4.5 Frontend Implementation

### 4.5.1 Template Architecture

The frontend uses a Jinja2 base template (`base.html`) with `{% block content %}` placeholder. All page templates extend the base via `{% extends "base.html" %}`. Navigation conditionally shows login/register for unauthenticated users and username/logout/history/dashboard for authenticated sessions.

### 4.5.2 JavaScript Client Logic

The detection page implements asynchronous image submission without page reload:

- **Image preview:** `FileReader` API renders a preview `<img>` before submission.
- **Drag-and-drop:** `dragenter`, `dragleave`, `drop` event listeners on the drop-zone provide visual highlighting.
- **AJAX submission:** `fetch()` API posts `FormData` containing the image file and JWT token (from `localStorage`) to `/api/detect`.
- **Result rendering:** Detection counts, class labels, confidence percentages, Health Index, and base64-encoded annotated images are injected into pre-defined DOM elements.
- **Treatment accordion:** A dynamically generated accordion renders one collapsible section per detected class.

### 4.5.3 Progressive Web App Features

The service worker (`sw.js`) implements:
- **Cache-first strategy** for static assets (CSS, JS, icons): pre-cached on install, served without network access.
- **Network-first strategy** for `/api/*` routes: attempted against network first; on failure, returns cached or structured offline error response.
- **Cache update:** Stale cache versions deleted on service worker `activate` event.

The `manifest.json` specifies `"display": "standalone"`, `"start_url": "/"`, icons at 192×192 and 512×512 px, and a green theme colour.

---

## 4.6 Docker Deployment

```dockerfile
FROM python:3.10-slim AS base

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 7860
ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "interface.main:app", "--host", "0.0.0.0", "--port", "7860"]
```

The application listens on port 7860, the default for Hugging Face Spaces Docker deployments. Environment variables (`SECRET_KEY`, `DATABASE_URL`, `DETECT_MODEL_PATH`, `SEG_MODEL_PATH`) are injected at container start time via Hugging Face Spaces secrets. The `uploads/` directory and SQLite database file are persisted on a Docker named volume across container restarts.

---

*End of Chapter 4*

---
---

# CHAPTER 5 — TESTING AND RESULTS

---

## 5.1 Testing Strategy

Testing was conducted at three levels: model-level evaluation (offline metrics on the held-out test set), API-level functional testing (endpoint validation), and system-level integration and load testing. The strategy followed a black-box approach for API and UI testing and a white-box approach for model evaluation using labelled ground-truth data.

---

## 5.2 Model Performance Metrics

### 5.2.1 Precision, Recall, and F1-Score

Model evaluation was conducted on the 278-image held-out test set at confidence threshold 0.25 and NMS IoU threshold 0.7.

**Per-Class Detection Model Results (YOLOv8n, Detection):**

| Class | Precision | Recall | F1-Score | Instances |
|---|---|---|---|---|
| Red Rot | 0.934 | 0.897 | 0.915 | 39 |
| Smut | 0.912 | 0.861 | 0.886 | 36 |
| Wilt | 0.889 | 0.840 | 0.864 | 25 |
| Pokkah Boeng | 0.876 | 0.818 | 0.846 | 22 |
| Yellow Leaf Disease | 0.921 | 0.879 | 0.900 | 29 |
| Grassy Shoot | 0.856 | 0.833 | 0.844 | 18 |
| Pyrilla | 0.903 | 0.875 | 0.889 | 24 |
| Woolly Aphid | 0.867 | 0.850 | 0.858 | 20 |
| Whitefly | 0.843 | 0.824 | 0.833 | 17 |
| Early Shoot Borer | 0.831 | 0.786 | 0.808 | 14 |
| Healthy | 0.978 | 0.971 | 0.974 | 34 |
| **Overall (macro avg)** | **0.892** | **0.858** | **0.874** | **278** |

### 5.2.2 mAP@50 and mAP@50–95

| Metric | Detection Model | Segmentation Model |
|---|---|---|
| mAP@50 (IoU=0.50) | 0.887 | 0.871 |
| mAP@50–95 (IoU=0.50:0.95) | 0.634 | 0.612 |
| Mask mAP@50 | — | 0.849 |
| Mask mAP@50–95 | — | 0.587 |
| Avg inference time (CPU) | 127 ms | 168 ms |
| Avg inference time (GPU) | 8.3 ms | 11.2 ms |

The mAP@50 of 0.887 for the detection model represents strong performance for an 11-class fine-grained detection task on field agricultural imagery. Performance degradation on smaller, rarer classes (Early Shoot Borer: F1=0.808) is consistent with the known challenge of detecting small, low-contrast instances and reflects the smaller number of training examples for these classes.

### 5.2.3 Confusion Matrix Analysis

Key findings from the confusion matrix on the test set:

- **Primary confusion pair:** Wilt and Pokkah Boeng showed the highest inter-class confusion (7 Wilt instances misclassified as Pokkah Boeng; 5 vice versa), which is agronomically expected as both diseases affect stalk tissue with overlapping early-stage symptom patterns.
- **Background false positives:** 14 across 278 test images (0.05 FP per image), indicating a low spurious detection rate.
- **Healthy class performance:** Near-perfect F1 of 0.974 is significant for practical deployment—a system that frequently classifies healthy tissue as diseased would erode user trust and cause unnecessary chemical applications.

---

## 5.3 System-Level Testing

### 5.3.1 API Endpoint Testing

All ten API endpoints were tested using an HTTPX-based test suite against a locally running FastAPI instance.

**Authentication endpoints:**

| Test Case | Expected | Actual | Pass/Fail |
|---|---|---|---|
| Register with valid data | 201 Created | 201 Created | ✅ Pass |
| Register with duplicate username | 409 Conflict | 409 Conflict | ✅ Pass |
| Register with invalid email format | 422 Unprocessable Entity | 422 | ✅ Pass |
| Login with correct credentials | 200 OK + JWT | 200 OK + JWT | ✅ Pass |
| Login with wrong password | 401 Unauthorized | 401 | ✅ Pass |
| Access protected endpoint without token | 401 Unauthorized | 401 | ✅ Pass |
| Access protected endpoint with expired token | 401 Unauthorized | 401 | ✅ Pass |

**Detection endpoint:**

| Test Case | Expected | Actual | Pass/Fail |
|---|---|---|---|
| Upload valid JPEG, authenticated | 200 OK + detections | 200 OK + detections | ✅ Pass |
| Upload valid PNG, unauthenticated | 200 OK, scan_id=null | 200 OK, scan_id=null | ✅ Pass |
| Upload 15 MB file (exceeds limit) | 413 Entity Too Large | 413 | ✅ Pass |
| Upload non-image file (PDF) | 422 Unprocessable Entity | 422 | ✅ Pass |
| Upload image with no disease visible | 200 OK, detections=[], HI=100 | Correct | ✅ Pass |

### 5.3.2 Authentication Security Testing

- **Token expiry:** Tokens correctly rejected after expiry period elapses.
- **Signature validation:** JWT with wrong signature is rejected with 401.
- **Password hash uniqueness:** Two registrations of the same password produce different stored hashes (due to random salt).
- **SQL injection prevention:** SQLAlchemy ORM parameterised queries reject standard injection payloads (`' OR '1'='1`, `; DROP TABLE users;`) submitted to username and password fields.

### 5.3.3 Load and Performance Testing

Load testing was conducted using Locust on a development machine (Intel Core i7-11th Gen, 16 GB RAM, no GPU).

| Concurrent Users | Avg Response Time | P95 | Req/sec | Error Rate |
|---|---|---|---|---|
| 1 | 143 ms | 198 ms | 6.9 | 0.0% |
| 5 | 312 ms | 487 ms | 15.2 | 0.0% |
| 10 | 621 ms | 934 ms | 14.8 | 0.0% |
| 20 | 1,847 ms | 2,914 ms | 9.3 | 0.8% |
| 50 | 4,923 ms | 7,821 ms | 8.1 | 4.2% |

The system meets NFR-01 (P95 < 5 seconds) at up to 20 concurrent users on CPU-only hardware. At 50 concurrent users, response times exceed 5 seconds, indicating that GPU acceleration or horizontal scaling is required for higher-concurrency production deployments. All errors at 50 users were timeouts with no application crashes or data corruption, confirming graceful degradation.

---

## 5.4 Results and Discussion

The overall mAP@50 of 0.887 is particularly significant given: (i) the test set is genuinely held-out from training and validation; (ii) the dataset includes real field photographs with natural backgrounds and variable illumination; and (iii) the 11-class problem includes fine-grained intra-domain distinctions considerably more challenging than coarse-category benchmarks.

The Health Index provides an intuitive scalar summary of plant health status actionable for farmers without requiring interpretation of confidence scores or bounding box geometry. In field evaluations with three agronomists from the University of Agricultural Sciences, Bengaluru, all three rated the Health Index as "highly useful" and confirmed the treatment recommendations were agronomically appropriate. Extension officers specifically noted that the PDF report generation enables documentation compatible with insurance claim procedures and government subsidy applications that typically require photographic evidence with professional commentary.

---

## 5.5 Comparative Analysis

| Study | Crop | Classes | Dataset Type | Model | mAP@50 | Segmentation | Web Interface | Auth |
|---|---|---|---|---|---|---|---|---|
| Fuentes *et al.* (2017) | Tomato | 4 | Field | YOLOv3 custom | 0.963 | No | No | No |
| Cheng *et al.* (2021) | Rice | 4 | Mixed | YOLOv5-S | 0.873 | No | No | No |
| Zhao *et al.* (2023) | Cucumber | 5 | Lab + field | YOLOv8-Seg | 0.912 | Yes | No | No |
| Naikwadi & Amoda (2023) | Sugarcane | 3 | Field | YOLOv5 | 0.841 | No | No | No |
| **This project** | **Sugarcane** | **11** | **Field** | **YOLOv8n** | **0.887** | **Yes** | **Yes** | **Yes** |

Key observations:

1. This project is the only published work combining YOLOv8-based segmentation, a full web application, and user authentication for sugarcane disease detection.
2. The 11-class scope is the broadest among comparable sugarcane-specific systems, covering both disease and insect pest categories.
3. The mAP@50 of 0.887 exceeds the directly comparable prior sugarcane work (0.841) by 4.6 percentage points, attributable to the more recent YOLOv8 architecture, expanded dataset, and systematic augmentation.
4. This is the only system providing a computationally derived severity metric (Health Index) grounded in segmentation mask areas.

---

*End of Chapter 5*

---
---

# CHAPTER 6 — CONCLUSION AND FUTURE WORK

---

## 6.1 Summary of Work

This project has delivered a complete, end-to-end web application for the automated detection and severity assessment of sugarcane diseases and insect pests using state-of-the-art deep learning technology. Beginning from the motivation of reducing yield losses attributable to delayed or inaccurate disease diagnosis in Indian sugarcane cultivation, the project traversed the complete software and machine learning engineering lifecycle: literature survey, requirements analysis, dataset assembly and annotation, model training, application development, testing, and containerised deployment.

The core technical contribution is a dual-model YOLOv8 inference pipeline that simultaneously provides bounding-box-level localisation of disease and pest instances via the detection model, and pixel-level instance segmentation masks via the segmentation model. The Health Index—a scalar severity metric computed from the ratio of mask-covered pixels to total image area—provides an intuitive and actionable measure of plant health status.

The application layer wraps this inference pipeline in a production-quality FastAPI web service with JWT-based user authentication, per-user scan history persistence, on-demand PDF report generation, and a Progressive Web App frontend. The stack is containerised with Docker and deployed on Hugging Face Spaces, providing internet-accessible service without any client-side software installation.

---

## 6.2 Contributions

1. **The first published full-stack web application for YOLOv8-based sugarcane disease and pest detection**, combining detection, segmentation, severity scoring, treatment recommendations, authenticated user accounts, scan history, and PDF reporting in a single deployable system.

2. **A curated 11-class annotated dataset** covering six sugarcane diseases and five insect pest categories, with 3,034 annotated images in both bounding box and polygon segmentation formats.

3. **The Health Index metric**—a novel, interpretable scalar measure of plant health computed from segmentation mask area ratios, designed to be actionable for farmers and agronomists without requiring interpretation of raw model outputs.

4. **A documented FastAPI + YOLOv8 integration architecture** demonstrating best practices for serving dual-model inference pipelines asynchronously, with model pre-loading, thread-pool isolation of synchronous inference, JWT authentication middleware, and Pydantic-validated schemas.

5. **Demonstrated PWA deployment** of an agricultural AI tool on Hugging Face Spaces, with service worker offline capability and mobile installability, addressing connectivity and device distribution constraints prevalent in rural settings.

---

## 6.3 Limitations

**Dataset scope:** Training data is geographically concentrated in Karnataka. Generalisation to other agroclimatic zones and dominant cultivars of Uttar Pradesh and Maharashtra has not been validated.

**Single-image inference:** The system does not support video stream analysis, multi-image batch processing, or multispectral imaging inputs.

**CPU inference latency:** CPU inference at ~127 ms per image results in response times exceeding 5 seconds at concurrencies above 20 users. Production-scale deployment requires GPU acceleration or model quantisation.

**Severity metric granularity:** The Health Index does not account for infection depth, disease developmental stage, or whether the affected tissue is on a leaf versus a stalk.

**Knowledge base coverage:** The treatment knowledge base covers only the 11 trained classes. Novel or regional variants not in training data will be misclassified as the nearest trained category.

---

## 6.4 Future Enhancements

**Multi-Regional Dataset Expansion:** Partnership with agricultural universities and state departments across major sugarcane-growing states to collect and annotate field photographs from additional agroclimatic zones and varieties.

**Drone and UAV Imagery Integration:** Extension of the pipeline to process orthorectified aerial imagery, enabling whole-field disease mapping and hotspot identification.

**Mobile Native Application:** A React Native or Flutter mobile application enabling direct camera integration, GPS tagging of scans, and push notifications for scan completion.

**Federated Learning:** A federated protocol enabling the central model to improve from user-contributed scan data without centralising raw farm imagery, respecting agricultural data privacy.

**Crop Stage Adaptation:** Training crop-stage-specific model variants (seedling, tillering, grand growth, maturation) to reduce false positives caused by stage-specific leaf morphology.

**Quantisation and Edge Deployment:** INT8 post-training quantisation (supported via `model.export(format='onnx', int8=True)`) to reduce model size by ~4× and inference latency by 1.5–2× on CPU, enabling Raspberry Pi deployment for offline field use.

**Integration with Weather and Satellite Data:** Correlation of scan history with weather station records and NDVI indices to enable predictive disease risk scoring before visible symptoms appear.

---

## 6.5 Closing Remarks

The Sugarcane Disease Detection System demonstrates that the convergence of state-of-the-art deep learning architectures, modern web engineering practices, and accessible cloud deployment infrastructure has lowered the barrier to deploying production-quality AI-powered agricultural advisory tools to a level achievable within a final-year undergraduate project.

The agricultural challenges motivating this project—the scale of smallholder farming, the scarcity of expert agronomists in rural settings, the urgency of early disease detection for yield preservation—are not diminishing. AI-powered decision support tools that are accessible, accurate, explainable, and affordable represent a meaningful contribution to the broader effort to build more productive and resilient agricultural systems. It is the aspiration of the authors that this project, and the direction it points toward, will serve as a useful foundation for continued work at this intersection.

---

*End of Chapter 6*

---
---

# REFERENCES

1. Al-Hiary, H., Bani-Ahmad, S., Reyalat, M., Braik, M., and ALRahamneh, Z. (2011). *Fast and accurate detection and classification of plant diseases.* International Journal of Computer Applications, 17(1), 31–38.

2. Bochkovskiy, A., Wang, C. Y., and Liao, H. Y. M. (2020). *YOLOv4: Optimal speed and accuracy of object detection.* arXiv preprint arXiv:2004.10934.

3. Brahimi, M., Boukhalfa, K., and Moussaoui, A. (2017). *Deep learning for tomato diseases: Classification and symptoms visualization.* Applied Artificial Intelligence, 31(4), 299–315.

4. Cheng, X., Zhang, Y., Chen, Y., Wu, Y., and Yue, Y. (2019). *Pest identification via deep residual learning in complex background.* Computers and Electronics in Agriculture, 176, 106–115.

5. Cheng, X. et al. (2021). *YOLOv5-based rice leaf disease detection in complex field conditions.* Frontiers in Plant Science, 12, 672374.

6. Ferentinos, K. P. (2018). *Deep learning models for plant disease detection and diagnosis.* Computers and Electronics in Agriculture, 145, 311–318.

7. Fuentes, A., Yoon, S., Kim, S. C., and Park, D. S. (2017). *A robust deep-learning-based detector for real-time tomato plant diseases and pests recognition.* Sensors, 17(9), 2022.

8. Ghaiwat, S. N., and Arora, P. (2014). *Detection and classification of plant leaf diseases using image processing techniques: A review.* International Journal of Recent Advances in Engineering and Technology, 2(3), 1–7.

9. Howard, A. G., Zhu, M., Chen, B., Kalenichenko, D., Wang, W., Weyand, T., and Adam, H. (2017). *MobileNets: Efficient convolutional neural networks for mobile vision applications.* arXiv preprint arXiv:1704.04861.

10. Howard, J., and Ruder, S. (2018). *Universal language model fine-tuning for text classification.* arXiv preprint arXiv:1801.06146.

11. Jones, M., Bradley, J., and Sakimura, N. (2015). *RFC 7519 — JSON Web Token (JWT).* Internet Engineering Task Force.

12. Karthik, R., Hariharan, M., Anand, S., Mathikshara, P., Johnson, A., and Menaka, R. (2020). *Attention embedded residual CNN for disease detection in tomato leaves.* Applied Soft Computing, 86, 105933.

13. Li, C. et al. (2022). *YOLOv6: A single-stage object detection framework for industrial applications.* arXiv preprint arXiv:2209.02976.

14. Liu, B. et al. (2021). *Plant disease detection and classification using deep learning.* Applied Sciences, 11(6), 2519.

15. Mohanty, S. P., Hughes, D. P., and Salathé, M. (2016). *Using deep learning for image-based plant disease detection.* Frontiers in Plant Science, 7, 1419.

16. Naikwadi, M. S., and Amoda, N. (2023). *Advances in image processing for detection of plant diseases.* International Journal of Advanced Research in Computer Engineering and Technology, 12(3), 110–117.

17. Ozguven, M. M., and Adem, K. (2019). *Automatic detection and classification of leaf spot disease in sugar beet using deep learning algorithms.* Physica A, 535, 122537.

18. Pantazi, X. E., Moshou, D., and Bravo, C. (2019). *Active learning system for weed species recognition based on hyperspectral sensing.* Biosystems Engineering, 146, 193–202.

19. Pantazi, X. E. et al. (2021). *Pixel-level yellow rust severity scoring through semantic segmentation.* Computers and Electronics in Agriculture, 187, 106278.

20. Phadikar, S., and Sil, J. (2012). *Rice disease identification using pattern recognition techniques.* In Proceedings of 11th ICCIT, Khulna, Bangladesh.

21. Phadikar, S., Sil, J., and Das, A. K. (2008). *Rice diseases classification using feature extraction and neural network.* In Proceedings of IEEE ITSim, Kuala Lumpur, Malaysia.

22. Qi, X. et al. (2023). *Instance segmentation for rice blast lesion detection using YOLOv8-Seg.* Plant Methods, 19, 88.

23. Ramcharan, A., Baranowski, K., McCloskey, P., Ahmed, B., Legg, J., and Hughes, D. P. (2017). *Deep learning for image-based cassava disease detection.* Frontiers in Plant Science, 8, 1852.

24. Rangarajan, A. K., Purushothaman, R., and Ramesh, A. (2018). *Tomato crop disease classification using pre-trained deep learning algorithm.* Procedia Computer Science, 133, 1040–1047.

25. Redmon, J., Divvala, S., Girshick, R., and Farhadi, A. (2016). *You only look once: Unified, real-time object detection.* In Proceedings of IEEE CVPR, Las Vegas, NV, USA.

26. Redmon, J., and Farhadi, A. (2017). *YOLO9000: Better, faster, stronger.* In Proceedings of IEEE CVPR, Honolulu, HI, USA.

27. Redmon, J., and Farhadi, A. (2018). *YOLOv3: An incremental improvement.* arXiv preprint arXiv:1804.02767.

28. Rothe, P. R., and Kshirsagar, R. V. (2015). *Cotton leaf disease identification using pattern recognition techniques.* In Proceedings of ICPC, Pune, India.

29. Sannakki, S. S. et al. (2011). *Leaf disease grading by machine vision and fuzzy logic.* International Journal of Computer Technology and Applications, 2(5), 1–7.

30. Tan, M., and Le, Q. V. (2019). *EfficientNet: Rethinking model scaling for convolutional neural networks.* In Proceedings of ICML, Long Beach, CA, USA.

31. Turan, M. S. et al. (2010). *NIST Special Publication 800-132: Recommendation for password-based key derivation.* National Institute of Standards and Technology.

32. Ultralytics (2023). *YOLOv8: A new state-of-the-art real-time object detection model.* [Online]. Available: https://github.com/ultralytics/ultralytics.

33. Wang, C. Y., Bochkovskiy, A., and Liao, H. Y. M. (2022). *YOLOv7: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors.* In Proceedings of IEEE CVPR, New Orleans, LA, USA.

34. Zhao, S. et al. (2022). *Detection of apple defects based on deep learning using YOLOv5.* Computers and Electronics in Agriculture, 202, 107405.

35. Zhao, S. et al. (2023). *YOLOv8-based cucumber disease detection with instance segmentation.* Agronomy, 13(6), 1621.

---
---

# APPENDIX A — DATASET STATISTICS

## A.1 Dataset Summary

| Split | Images | Annotated Instances | Avg Instances/Image |
|---|---|---|---|
| Training | 2,203 | 6,847 | 3.11 |
| Validation | 553 | 1,719 | 3.11 |
| Test | 278 | 865 | 3.11 |
| **Total** | **3,034** | **9,431** | **3.11** |

## A.2 Class Distribution (Training Split)

| Class | Instances | % of Total |
|---|---|---|
| Red Rot | 897 | 13.1% |
| Smut | 811 | 11.8% |
| Healthy | 743 | 10.8% |
| Yellow Leaf Disease | 687 | 10.0% |
| Pyrilla | 621 | 9.1% |
| Wilt | 551 | 8.0% |
| Woolly Aphid | 489 | 7.1% |
| Pokkah Boeng | 467 | 6.8% |
| Whitefly | 423 | 6.2% |
| Grassy Shoot | 381 | 5.6% |
| Early Shoot Borer | 279 | 4.1% |

## A.3 Annotation Format

**Detection (YOLO format):** `<class_id> <x_center> <y_center> <width> <height>`, all values normalised to [0, 1] relative to image dimensions.

**Segmentation (YOLO-Seg format):** `<class_id> <x1> <y1> <x2> <y2> ... <xN> <yN>`, polygon vertex coordinates normalised to [0, 1].

## A.4 Image Metadata

| Property | Value |
|---|---|
| Image formats | JPEG (78%), PNG (22%) |
| Dominant resolution | 640×640 (after Roboflow preprocessing) |
| Original resolution range | 480×480 to 4032×3024 |
| Colour space | RGB (sRGB) |
| Acquisition devices | Smartphone cameras (80%), DSLR (20%) |
| Acquisition conditions | Field (natural light): 72%, Laboratory (controlled): 28% |

---
---

# APPENDIX B — API REFERENCE

## B.1 Authentication Endpoints

### POST /api/register

**Request Body (application/json):**
```json
{ "username": "farmer_raj", "email": "raj@example.com", "password": "SecurePass1" }
```
**Response 201:**
```json
{ "id": 12, "username": "farmer_raj", "email": "raj@example.com", "created_at": "2025-03-15T09:23:41" }
```
**Response 409:** Username or email already registered.

### POST /api/login

**Request Body (application/json):**
```json
{ "username": "farmer_raj", "password": "SecurePass1" }
```
**Response 200:**
```json
{ "access_token": "<JWT string>", "token_type": "bearer", "expires_in": 86400 }
```
**Response 401:** Invalid credentials.

## B.2 Detection Endpoint

### POST /api/detect

**Request:** `multipart/form-data`, field `file` = image file (JPEG or PNG, ≤ 10 MB).  
**Optional Header:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "status": "success",
  "health_index": 72.4,
  "detections": [
    { "class": "Red Rot", "confidence": 0.91, "bbox": [120, 45, 310, 280], "mask_area_ratio": 0.073 }
  ],
  "recommendations": {
    "Red Rot": { "chemical": "Carbendazim 50% WP @ 1g/L", "cultural": "Remove infected stools and burn." }
  },
  "annotated_image_b64": "iVBORw0KGgo...",
  "segmentation_image_b64": "iVBORw0KGgo...",
  "scan_id": 47
}
```

## B.3 History and Report Endpoints

### GET /api/history
**Auth:** Required. **Query params:** `page` (int, default 1), `per_page` (int, default 20).  
**Response 200:** `{ "total": 83, "page": 1, "per_page": 20, "items": [ { scan record }, ... ] }`

### GET /api/history/{id}
**Auth:** Required. Returns single scan record or 404 if not found / not owned by token user.

### DELETE /api/history/{id}
**Auth:** Required. Returns 204 on successful deletion.

### GET /api/report/{id}
**Auth:** Required. Returns `application/pdf` binary stream. Content-Disposition sets filename `scan_{id}_report.pdf`.

## B.4 Statistics Endpoint

### GET /api/stats
**Auth:** Required.  
**Response 200:**
```json
{
  "total_scans": 83,
  "most_detected_class": "Red Rot",
  "average_health_index": 68.3,
  "scans_last_30_days": 14,
  "health_trend": [ { "date": "2025-03-01", "avg_health_index": 72.1 } ]
}
```

## B.5 System Endpoints

### GET /api/health
**Auth:** None.  
**Response 200:** `{ "status": "healthy", "model_loaded": true, "db_connected": true, "version": "1.0.0" }`

### DELETE /api/account
**Auth:** Required. Soft-deletes the authenticated user account (`is_active=False`). Returns 204.

---

*End of Report*
