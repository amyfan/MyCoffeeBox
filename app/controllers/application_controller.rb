class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  private
  # set the language
  def set_locale
    if params[:locale].blank?
      I18n.locale = extract_locale_from_accept_language_header
      #redirect_to "/#{extract_locale_from_accept_language_header}"
    else
      I18n.locale = params[:locale]
    end
  end

  # extract the language from the clients browser
  def extract_locale_from_accept_language_header
    browser_locale = request.env['HTTP_ACCEPT_LANGUAGE'].try(:scan, /^[a-z]{2}/).try(:first).try(:to_sym)
    if I18n.available_locales.include? browser_locale
    browser_locale
    else
      I18n.default_locale
    end
  end

  # pass in language as a default url parameter
  def self.default_url_options
    { :locale => I18n.locale }
  end

  rescue_from 'CanCan::AccessDenied' do |exception|
    redirect_to root_url, :alert => exception.message
  end
end
