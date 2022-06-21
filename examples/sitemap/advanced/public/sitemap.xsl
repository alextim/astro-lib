<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
        version="2.0"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>
                    Sitemap
                    <xsl:if test="sitemap:sitemapindex">Index</xsl:if>
                </title>
                <link rel="stylesheet" href="https://unpkg.com/tachyons@4.6.1/css/tachyons.min.css"/>
            </head>
            <body class="ph3 pb3 mid-gray">
                <header class="mw8 pv4 center">
                    <div class="flex items-center">
                        <h1 class="ma0 mr2 f2 blue">Sitemap</h1>
                        <xsl:if test="sitemap:sitemapindex">
                            <span class="dib mr2 ph3 pv1 f6 normal mid-gray bg-light-blue br-pill">Index</span>
                        </xsl:if>
                        <xsl:if test="sitemap:urlset/sitemap:url/image:image">
                            <span class="dib mr2 ph3 pv1 f6 normal mid-gray bg-light-blue br-pill">Images</span>
                        </xsl:if>
                        <xsl:if test="sitemap:urlset/sitemap:url/video:video">
                            <span class="dib mr2 ph3 pv1 f6 normal mid-gray bg-light-blue br-pill">Video</span>
                        </xsl:if>
                        <xsl:if test="sitemap:urlset/sitemap:url/xhtml:link">
                            <span class="dib mr2 ph3 pv1 f6 normal mid-gray bg-light-blue br-pill">Xhtml</span>
                        </xsl:if>
                    </div>
                    <h2 class="ma0 mt4 f4 normal">
                        <xsl:choose>
                            <xsl:when test="sitemap:sitemapindex">
                                This index contains
                                <strong class="blue"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong>
                                sitemaps.
                            </xsl:when>
                            <xsl:otherwise>
                                This index contains
                                <strong class="blue"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
                                URLs.
                            </xsl:otherwise>
                        </xsl:choose>
                    </h2>
                    <p>
                        This is an XML sitemap, meant for consumption by search engines.<br/>
                        You can find more information about XML sitemaps on <a href="https://sitemaps.org" class="link blue">sitemaps.org</a>.
                    </p>
                </header>

                <xsl:apply-templates/>

                <footer class="mw8 center pv4 tc">
                    See more Astro integrations on <a href="https://github.com/alextim/astro-lib" title="Go to Github" class="link blue">GitHub</a>
                </footer>

            </body>
        </html>
    </xsl:template>


    <xsl:template match="sitemap:sitemapindex">
        <div class="mw8 center">
            <div class="overflow-auto">
                <table class="w-100 f6 b--silver ba bw1" cellspacing="0">
                    <thead class="bg-silver">
                        <tr>
                            <th class="pa3 fw6 tl dark-gray" style="width:60px"></th>
                            <th class="pa3 fw6 tl dark-gray">URL</th>
                            <th class="pa3 fw6 tr dark-gray" style="width:200px">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody class="lh-copy bg-near-white">
                    <xsl:for-each select="sitemap:sitemap">
                        <tr class="hover-bg-white">
                            <xsl:variable name="loc">
                                <xsl:value-of select="sitemap:loc"/>
                            </xsl:variable>
                            <xsl:variable name="pno">
                                <xsl:value-of select="position()"/>
                            </xsl:variable>
                            <td class="pa3 tc b bb b--silver">
                                <xsl:value-of select="$pno"/>
                            </td>
                            <td class="pa3 b bb b--silver">
                                <a href="{$loc}" class="link blue">
                                    <xsl:value-of select="sitemap:loc"/>
                                </a>
                            </td>
                            <xsl:if test="sitemap:lastmod">
                            <td class="pa3 tr bb b--silver">
                                <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), concat(' ', substring(sitemap:lastmod, 12, 5)), concat(' ', substring(sitemap:lastmod, 20, 6)))"/>
                            </td>
                            </xsl:if>
                            <xsl:apply-templates/>
                        </tr>
                    </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="sitemap:urlset">
        <div class="mw8 center">
            <div class="overflow-auto">
                <table class="w-100 f6 b--silver ba bw1" cellspacing="0">
                    <thead class="bg-silver">
                        <tr>
                            <th class="pa3 fw6 tl dark-gray" style="width:60px"></th>
                            <th class="pa3 fw6 tl dark-gray">URL</th>
                            <xsl:if test="sitemap:url/sitemap:changefreq">
                            <th class="pa3 fw6 tr dark-gray" style="width:130px">Change Freq.</th>
                            </xsl:if>
                            <xsl:if test="sitemap:url/sitemap:priority">
                            <th class="pa3 fw6 tr dark-gray" style="width:90px">Priority</th>
                            </xsl:if>
                            <xsl:if test="sitemap:url/sitemap:lastmod">
                            <th class="pa3 fw6 tr dark-gray" style="width:200px">Last Modified</th>
                            </xsl:if>
                        </tr>
                    </thead>
                    <tbody class="lh-copy bg-near-white">
                    <xsl:for-each select="sitemap:url">
                        <tr class="hover-bg-white">
                            <xsl:variable name="loc">
                                <xsl:value-of select="sitemap:loc"/>
                            </xsl:variable>
                            <xsl:variable name="pno">
                                <xsl:value-of select="position()"/>
                            </xsl:variable>
                            <td class="pa3 tc b bb b--silver">
                                <xsl:value-of select="$pno"/>
                            </td>
                            <td class="pa3 bb b--silver">
                                <p>
                                    <a href="{$loc}" class="link blue">
                                        <xsl:value-of select="sitemap:loc"/>
                                    </a>
                                </p>
                                <xsl:apply-templates select="xhtml:*"/>
                                <xsl:apply-templates select="image:*"/>
                                <xsl:apply-templates select="video:*"/>
                            </td>
                            <xsl:apply-templates select="sitemap:changefreq"/>
                            <xsl:apply-templates select="sitemap:priority"/>
                            <xsl:if test="sitemap:lastmod">
                            <td class="pa3 tr bb b--silver">
                                <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), concat(' ', substring(sitemap:lastmod, 12, 5)), concat(' ', substring(sitemap:lastmod, 20, 6)))"/>
                            </td>
                            </xsl:if>
                        </tr>
                    </xsl:for-each>
                    </tbody>
                </table>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="sitemap:loc|sitemap:lastmod|image:loc|image:caption|video:*">
    </xsl:template>

    <xsl:template match="sitemap:changefreq|sitemap:priority">
        <td class="pa3 tr bb b--silver">
            <xsl:apply-templates/>
        </td>
    </xsl:template>

    <xsl:template match="xhtml:link">
        <xsl:variable name="altloc">
            <xsl:value-of select="@href"/>
        </xsl:variable>
        <p>
            <strong>Xhtml: </strong>
            <a href="{$altloc}" class="mr2 link blue">
                <xsl:value-of select="@href"/>
            </a>

            <xsl:if test="@hreflang">
                <small class="dib mr2 ph1 pv1 tracked lh-solid white bg-silver br-pill">
                    <xsl:value-of select="@hreflang"/>
                </small>
            </xsl:if>

            <xsl:if test="@rel">
                <small class="dib mr2 ph2 pv1 tracked lh-solid white bg-silver br-pill">
                    <xsl:value-of select="@rel"/>
                </small>
            </xsl:if>

            <xsl:if test="@media">
                <small class="dib mr2 ph2 pv1 tracked lh-solid white bg-silver br-pill">
                    <xsl:value-of select="@media"/>
                </small>
            </xsl:if>
        </p>
        <xsl:apply-templates/>
    </xsl:template>
</xsl:stylesheet>
