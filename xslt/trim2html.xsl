<?xml version="1.0" encoding="UTF-8"?>

<!-- 
 *
 * Legislation
 * https://github.com/legislation/ 
 *
 * Copyright (c) 2014 
 * Licensed under the GNU Public License (GPL)
 * http://www.gnu.org/licenses
 *
 * Designed and built by TSO.
 *
 * HTML5 Legislation Drafting is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * HTML5 Legislation Drafting is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * For the GNU General Public License, please see http://www.gnu.org/licenses/
 *  
 -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xhtml="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xs" version="2.0">
	<xsl:output method="xhtml" omit-xml-declaration="yes"/>
	<xsl:strip-space elements="*"/>
	<xsl:template match="/">
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="*:PrimaryPrelims/*:Title">
		<h1 class="Title editable">
			<xsl:apply-templates select="node()"/>
		</h1>
	</xsl:template>
	<xsl:template match="*:Versions"/>
	<xsl:template match="*:Resources"/>
	<xsl:template match="*:Metadata"/>
	<xsl:template match="*:MarginNotes"/>
	<xsl:template match="*:PrimaryPrelims/*:Number">
		<h2 class="Number editable">
			<xsl:apply-templates select="node()"/> &#160; </h2>
	</xsl:template>
	<xsl:template match="*:PrimaryPrelims/*:LongTitle">
		<p class="LongTitle editable">
			<xsl:apply-templates select="node()"/> &#160; </p>
	</xsl:template>
	<xsl:template match="*">
		<div>
			<xsl:attribute name="class">
				<xsl:value-of select="name()"/>
				<xsl:if test="name() = 'Title'">
					<xsl:text> editable structural</xsl:text>
				</xsl:if>
			</xsl:attribute>
			<xsl:attribute name="id" select="if(@id) then @id else generate-id()"/>
			<xsl:apply-templates select="node()"/>
		</div>
	</xsl:template>
	<xsl:template match="xhtml:*">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates select="node()"/>
		</xsl:copy>
	</xsl:template>
	<xsl:template match="*:Pblock">
		<div>
			<xsl:attribute name="class">
				<xsl:value-of select="name()"/>
				<xsl:text> structural</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="id" select="generate-id()"/>
			<xsl:apply-templates select="node()"/>
		</div>
	</xsl:template>
	<xsl:template match="*:Pblock/*:Title">
		<h4>
			<xsl:attribute name="class">
				<xsl:value-of select="name()"/>
				<xsl:text> editable Pblock_handle</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="id" select="generate-id()"/>
			<xsl:apply-templates select="node()"/>
		</h4>
	</xsl:template>
	<xsl:template match="*:Chapter">
		<div class="{name()} structural" id="{generate-id()}" data-number="{replace(*:Number,'CHAPTER ','')}">
			<h3 class="{name()}_handle">CHAPTER <span class="number"><xsl:value-of select="replace(*:Number,'CHAPTER ','')"/></span> - <span class="editable"><xsl:value-of select="*:Title"/></span></h3>
			<div class="{name()}_content">
				<xsl:apply-templates/>
			</div>
		</div>
	</xsl:template>
	<xsl:template match="*:Chapter/*:Number"/>
	<xsl:template match="*:Chapter/*:Title"/>
	<xsl:template match="*:Part">
		<div class="{name()} structural" id="{generate-id()}" data-number="{replace(*:Number,'PART ','')}">
			<h2 class="{name()}_handle">PART <span class="number"><xsl:value-of select="replace(*:Number,'PART ','')"/></span> - <span class="editable"><xsl:value-of select="*:Title"/></span></h2>
			<div class="{name()}_content">
				<xsl:apply-templates/>
			</div>
		</div>
	</xsl:template>
	<xsl:template match="*:Part/*:Number"/>
	<xsl:template match="*:Part/*:Title"/>
	<xsl:template match="*:Schedule"/>
	<!--<div class="{name()} structural" id="{@id}">
			<h2 class="{name()}_handle"><xsl:value-of select="*:Number"/> - <span class="editable"><xsl:value-of select=".//*:Title"/></span></h2>
			<div class="{name()}_content">
				<xsl:apply-templates/>
			</div>
		</div>>
	</xsl:template-->
	<xsl:template match="*:Schedule/*:Number"/>
	<xsl:template match="*:Schedule/*:Title"/>
	<xsl:template match="*:Schedule/*:TitleBlock"/>
	<xsl:template match="*:P1group">
		<ol class="{name()}">
			<li id="{generate-id()}" data-number="{count(preceding::*:P1group) + 1}">
				<h5 class="{name()}_handle"><span class="number"><xsl:value-of select="count(preceding::*:P1group) + 1"/></span>. <span class="editable"><xsl:value-of select="*:Title"/></span></h5>
				<div class="{name()}_content editable">
					<xsl:apply-templates select="*:P1/*"/>
				</div>
			</li>
		</ol>
	</xsl:template>
	<xsl:template match="*:P1group/*:Number"/>
	<xsl:template match="*:P1group/*:Title"/>
	<xsl:template match="*:P1|*:P2|*:P3|*:P4">
		<ol>
			<li class="{name()}" data-number="{*:Pnumber}" data-type="{name()}">
				<xsl:attribute name="id" select="@id"/>
				<xsl:apply-templates select="node()"/>
			</li>
		</ol>
	</xsl:template>
	<xsl:template match="*:P1para|*:P2para|*:P3para|*:P4para">
		<xsl:choose>
			<xsl:when test="count(child::*) > 1">
				<!--div class="{name()}" data-number="{*:Pnumber}">
					<xsl:if test="@id">
						<xsl:attribute name="id" select="@id"/>
					</xsl:if-->
				<xsl:apply-templates select="node()"/>
				<!--/div-->
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="node()" mode="child"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="*:P1/*:Pnumber|*:P2/*:Pnumber|*:P3/*:Pnumber|*:P4/*:Pnumber"/>
	<xsl:template match="*:P1para/*:Text|*:P2para/*:Text|*:P3para/*:Text|*:P4para/*:Text" priority="10" mode="child">
		<xsl:apply-templates select="node()"/>
	</xsl:template>
	<xsl:template match="*:P1para/*:Text|*:P2para/*:Text|*:P3para/*:Text|*:P4para/*:Text" priority="10">
		<xsl:apply-templates select="node()"/>
	</xsl:template>
	<xsl:template match="*:ListItem/*:Para">
		<xsl:apply-templates select="node()"/>
	</xsl:template>
	<xsl:template match="*:P1//*:Text">
		<p>
			<xsl:apply-templates select="node()"/>
		</p>
	</xsl:template>
	<xsl:template match="*:Text">
		<div class="Text editable">
			<p>
				<xsl:apply-templates select="node()"/>
			</p>
		</div>
	</xsl:template>
	<xsl:template match="*:Abbreviation|*:Acronym">
		<abbr title="{@Expansion}">
			<xsl:apply-templates select="node()"/>
		</abbr>
	</xsl:template>
	<xsl:template match="*:Citation">
		<a href="{@URI}" id="{@id}">
			<xsl:apply-templates select="node()"/>
		</a>
	</xsl:template>
	<xsl:template match="*:InternalLink">
		<span class="xref xref-internal" data-href="{@Ref}" id="{@id}">
			<xsl:for-each select="tokenize(.,'\(')">
				<xsl:if test="normalize-space(.) !=''">
					<xsl:if test="contains(.,')')">
						<xsl:text> (</xsl:text>
					</xsl:if>
					<span>
						<xsl:choose>
							<xsl:when test="position() = last()">
								<xsl:attribute name="class" select="'number'"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="class" select="'parent-number'"/>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:value-of select="normalize-space(replace(.,'\)',''))"/>
					</span>
					<xsl:if test="contains(.,')')">
						<xsl:text>)</xsl:text>
					</xsl:if>
				</xsl:if>
			</xsl:for-each>
		</span>
	</xsl:template>
	<xsl:template match="*:SmallCaps">
		<em class="SmallCaps">
			<xsl:apply-templates select="node()"/>
		</em>
	</xsl:template>
	<xsl:template match="*:UnorderedList">
		<ul class="{name()}">
			<xsl:apply-templates select="node()"/>
		</ul>
	</xsl:template>
	<xsl:template match="*:OrderedList">
		<ol class="{name()}">
			<xsl:apply-templates select="node()"/>
		</ol>
	</xsl:template>
	<xsl:template match="*:ListItem">
		<li class="{name()}">
			<xsl:apply-templates select="node()"/>
		</li>
	</xsl:template>
	<xsl:template match="*:ListItem//*:Text">
		<xsl:apply-templates select="node()"/>
	</xsl:template>
	<xsl:template match="*:Term">
		<strong class="Term">
			<xsl:apply-templates select="node()"/>
		</strong>
	</xsl:template>
</xsl:stylesheet>
