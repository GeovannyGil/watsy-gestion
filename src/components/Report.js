import { jsPDF } from 'jspdf'
import { PDFObject } from 'react-pdfobject'
import { format, setGlobalDateMasks } from 'fecha'
import service from '../assets/img/service.png'
import fontPBold from '../assets/fonts/Poppins-Bold-normal'
import fontPSemibold from '../assets/fonts/Poppins-SemiBold-normal'
import fontPMedium from '../assets/fonts/Poppins-Medium-normal'
import fontMontserratMedium from '../assets/fonts/Montserrat-Medium-normal'
// import fontMontserratSemibold from '../assets/fonts/Montserrat-SemiBold-normal'
// IMAGES
import backgroundReport from '../assets/img/Background.png'
import squarePenales from '../assets/img/SquareGestiones.png'
import logoPenales from '../assets/img/logoPenales.png'
import logoPoliciales from '../assets/img/logoPoliciales.png'
import logoSAT from '../assets/img/logoSAT.png'
import logoAgenciaVirtual from '../assets/img/logoAgenciaVirtuales.png'

setGlobalDateMasks({
  myMask: 'DD/MM/YYYY',
  myMask2: 'HH:mm A'
})

const Reporte = ({ dataClientReport }) => {
  // CREATE DOCUMENT PDF
  // eslint-disable-next-line new-cap
  const doc = new jsPDF('p', 'pt', 'letter', true)

  // VARIABLES
  let textPositionDataClient = 190.5
  doc.setProperties({
    title: `${dataClientReport.names} ${dataClientReport.lastNames}`,
    author: 'Watsy S.A.',
    creator: 'Watsy S.A.'
  })
  // ADD CUSTIOM FILE FONT
  // POPPINS BOLD
  doc.addFileToVFS('Poppins-Bold.ttf', fontPBold)
  doc.addFont('Poppins-Bold.ttf', 'Poppins-Bold', 'normal')
  // POPPINS SEMI BOLD
  doc.addFileToVFS('Poppins-SemiBold.ttf', fontPSemibold)
  doc.addFont('Poppins-SemiBold.ttf', 'Poppins-SemiBold', 'normal')
  // POPPINS MEDIUM
  doc.addFileToVFS('Poppins-Medium.ttf', fontPMedium)
  doc.addFont('Poppins-Medium.ttf', 'Poppins-Medium', 'normal')
  // MONTSERRAT MEDIUM
  doc.addFileToVFS('Montserrat-Medium.ttf', fontMontserratMedium)
  doc.addFont('Montserrat-Medium.ttf', 'Montserrat-Medium', 'normal')

  // Get Size Document
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  // Background image
  doc.addImage(backgroundReport, 'PNG', 0, 0, width, height, undefined, 'FAST')
  // IMAGE OF SERVICE
  doc.addImage(service, 'PNG', 41.5, 42, 175.7375, 48.48, undefined, 'MEDIUM')

  // DATA HEAD
  // Codigo de cliente
  // Gestion
  doc.setFont('Poppins-Medium', 'normal')
  doc.setFontSize(7.68)

  doc.setTextColor('#232323')
  doc.text('Fecha de tramite:', 378, 54)
  doc.setTextColor('#9F9E9E')
  doc.text(format(new Date(), 'myMask'), 498, 54)
  doc.setTextColor('#232323')
  doc.text('Código de cliente:', 378, 71)
  doc.setTextColor('#9F9E9E')
  doc.text(dataClientReport.codeClient, 498, 71)

  doc.setTextColor('#232323')
  doc.text('Hora:', 378, 89)
  doc.setTextColor('#9F9E9E')
  doc.text(format(new Date(), 'myMask2'), 498, 89)

  // TITLE DATA GENERAL
  doc.setFont('Poppins-Bold', 'normal')
  doc.setFontSize(19)
  doc.setTextColor('#232323')
  doc.text('DATOS GENERALES', width / 2, 155.5, { align: 'center', charSpace: 0.5 })

  // DATA CLIENT TITLES
  doc.setFont('Poppins-SemiBold', 'normal')
  doc.setFontSize(10.3)

  doc.setTextColor('#232323')
  doc.text('Nombre completo:', 91, textPositionDataClient)
  doc.setTextColor('#5E5E5E')
  doc.text(`${dataClientReport?.names} ${dataClientReport?.lastNames}`, 204, textPositionDataClient)

  textPositionDataClient += 20
  doc.setTextColor('#232323')
  doc.text('Télefono:', 91, textPositionDataClient)
  doc.setTextColor('#5E5E5E')
  doc.text(dataClientReport?.phone, 204, textPositionDataClient)

  textPositionDataClient += 20
  doc.setTextColor('#232323')
  doc.text('Correo electrónico:', 91, textPositionDataClient)
  doc.setTextColor('#5E5E5E')
  doc.text(dataClientReport?.email, 204, textPositionDataClient)

  textPositionDataClient += 20
  doc.setTextColor('#232323')
  doc.text('Contraseña:', 91, textPositionDataClient)
  doc.setTextColor('#5E5E5E')
  doc.text(dataClientReport?.password, 204, textPositionDataClient)

  // TITLE DATA GENERAL
  doc.setFont('Poppins-Bold', 'normal')
  doc.setFontSize(19)
  doc.setTextColor('#232323')
  if ((dataClientReport.gestiones.penales === true) || (dataClientReport.gestiones.gestionNit === true) || (dataClientReport.gestiones.policiales === true) || (dataClientReport.gestiones.agenciaVirtual === true) || (dataClientReport.gestiones.penales === true)) {
    doc.text('DATOS DE LOS SERVICIOS', width / 2, 294, { align: 'center', charSpace: 0.5 })
  }

  // DATA ANTECEDENTES PENALES
  // SE SUMA 88 DESPUES DE CADA SERVICIO
  let positionRectangle = 322
  doc.setFontSize(10)
  if (dataClientReport.gestiones.penales === true) {
    doc.addImage(squarePenales, 'PNG', 91, positionRectangle, 430, 71, undefined, 'FAST')
    doc.addImage(logoPenales, 'PNG', 102, positionRectangle + 30, 28, 30, undefined, 'FAST')

    doc.setTextColor('#232323')
    doc.setFont('Poppins-SemiBold', 'normal')
    doc.text('DATOS DE ANTECEDENTES PENALES', 140, positionRectangle + 16, { charSpace: 0.5 })

    doc.setFont('Poppins-Medium', 'normal')

    doc.setTextColor('#232323')
    doc.text('Correo electrónico:', 140, positionRectangle + 40)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport.penales?.email, 266, positionRectangle + 40)

    doc.setTextColor('#232323')
    doc.text('Contraseña:', 140, positionRectangle + 60)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport.penales?.password, 266, positionRectangle + 60)
    positionRectangle += 88
  }

  // DATA ANTECEDENTES POLICIALES
  if (dataClientReport.gestiones.policiales === true) {
    doc.addImage(squarePenales, 'PNG', 91, positionRectangle, 430, 71, undefined, 'FAST')
    doc.addImage(logoPoliciales, 'PNG', 102, positionRectangle + 30, 28, 30, undefined, 'FAST')

    doc.setFont('Poppins-SemiBold', 'normal')
    doc.setTextColor('#232323')
    doc.text('DATOS DE ANTECEDENTES POLICIALES', 140, positionRectangle + 16, { charSpace: 0.5 })

    doc.setFont('Poppins-Medium', 'normal')

    doc.setTextColor('#232323')
    doc.text('No. de Identificación:', 140, positionRectangle + 40)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport.policiales?.cui, 266, positionRectangle + 40)

    doc.setTextColor('#232323')
    doc.text('Contraseña:', 140, positionRectangle + 60)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport.policiales?.password, 266, positionRectangle + 60)
    positionRectangle += 88
  }

  // DATA NIT
  if (dataClientReport.gestiones.gestionNit === true) {
    doc.addImage(squarePenales, 'PNG', 91, positionRectangle, 430, 71, undefined, 'FAST')
    doc.addImage(logoSAT, 'PNG', 102, positionRectangle + 30, 28, 30, undefined, 'FAST')

    doc.setFont('Poppins-SemiBold', 'normal')
    doc.setTextColor('#232323')
    doc.text('DATO DEL NIT', 140, positionRectangle + 16, { charSpace: 0.5 })

    doc.setFont('Poppins-Medium', 'normal')

    doc.setTextColor('#232323')
    doc.text('No. de NIT:', 140, positionRectangle + 48)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport?.nit, 220, positionRectangle + 48)
    positionRectangle += 88
  }

  // DATA GENCIA VIRTUAL
  if (dataClientReport.gestiones.agenciaVirtual === true) {
    doc.addImage(squarePenales, 'PNG', 91, positionRectangle, 430, 71, undefined, 'FAST')
    doc.addImage(logoAgenciaVirtual, 'PNG', 102, positionRectangle + 30, 28, 30, undefined, 'FAST')

    doc.setFont('Poppins-SemiBold', 'normal')
    doc.setTextColor('#232323')
    doc.text('DATOS DE LA AGENCIA VIRTUAL', 140, positionRectangle + 16, { charSpace: 0.5 })

    doc.setFont('Poppins-Medium', 'normal')
    doc.setTextColor('#232323')
    doc.text('Usuario:', 140, positionRectangle + 40)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport?.nit, 266, positionRectangle + 40)

    doc.setTextColor('#232323')
    doc.text('Contraseña:', 140, positionRectangle + 60)
    doc.setTextColor('#5E5E5E')
    doc.text(dataClientReport.agenciaVirtual?.password, 266, positionRectangle + 60)
  }

  // FOOTER
  doc.setFont('Montserrat-Medium', 'normal')
  doc.setTextColor('#232323')
  doc.textWithLink('gestiones@watsy.io', 60, 710, { url: 'mailto:gestiones@watsy.io' })
  doc.textWithLink('+502 3114-0222  |', 60, 730, { url: 'tel:+502 3114-0222' })
  doc.textWithLink('+502 7833-1140', 144, 730, { url: 'tel:+502 7833-1140' })
  doc.textWithLink('Avenida del niño 5-74 Zona 5', 60, 748, { url: 'https://goo.gl/maps/xgrQQTt9dYNViddN7' })

  // SQUARE LINK FROM INSTAGRAM
  // doc.rect(294, 718, 15, 15, 'FD')
  doc.link(294, 718, 15, 15, { url: 'https://www.instagram.com/watsy.io' })

  // SQUARE LINK FROM FACEBOOK
  // doc.rect(315, 718, 15, 15, 'FD')
  doc.link(315, 718, 15, 15, { url: 'https://www.facebook.com/watsy.io' })

  // SQUARE LINK FROM WEB
  // doc.rect(338, 718, 15, 15, 'FD')
  doc.link(338, 718, 15, 15, { url: 'https://watsy.io' })

  // Preview PDF
  const url = doc.output('bloburl')
  return <PDFObject url={url} width='100%' height='100%' containerId='PDFOBJECTREPORT' />
}

export default Reporte
